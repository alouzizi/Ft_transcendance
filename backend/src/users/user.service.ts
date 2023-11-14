import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {  User} from '@prisma/client'; 
import { JwtService } from '@nestjs/jwt';
import { MessageItemList } from "./dto/user.dto";
import { Channel, Message, Status } from "@prisma/client";
import { ChannelService } from "src/channel/channel.service";

@Injectable()
export class UserService {
  private user: User[] = [];
  constructor(
    private prisma: PrismaService,
    private channelService: ChannelService,
  ){}
  async createUser(user1:any){
    console.log("my user iss",user1.intra_id);
    const user = await this.prisma.user.create({
      data:{
        intra_id: user1.intra_id.toString(),
        nickname: user1.login42.toString(),
        email: user1.email.toString(),
        profilePic: user1.profilePicture.toString(),
        last_name: user1.last_name,
        first_name: user1.first_name,
        hash: user1.hash,
        isTwoFactorAuthEnabled: user1.isTwoFactorAuthEnabled || false, // Assuming it's a boolean property
      },
    });
    return user;
  }
  async findOne(email: string) {
    return this.user.find(user => user.email === email);
  }

  async setTwoFactorAuthSecret(secret: string, id: string) {
    const userToUpdate = await this.user.find(user => user.id === id);
    userToUpdate.twoFactorAuth = secret === 'true';
  }

  async turnOnTwoFactorAuthentication(id: string) {
    this.user.find(user => user.id === id).isTwoFactorAuthEnabled = true;
  }
    async getUsers() {
    return this.prisma.user.findMany();
  }
  async getUserByEmail(intra_id: string) {
    return this.prisma.user.findUnique({ where: { intra_id: intra_id} });
  }
  
  async getUserById(id: string){
    return this.prisma.user.findUnique({
      where: { intra_id: id },
    });
  }
  async updatUserdata(intra_id: string,nickname: string,image: string){
    const user = await this.prisma.user.update({
      where:{
        intra_id: intra_id,
      },
      data:{
        nickname: nickname,
        profilePic: image,
      }
    });
    return user;
  }
async findByIntraId(intra_id: string){
  console.log("untra id = ",intra_id);
  return this.prisma.user.findUnique({
    where: { intra_id: intra_id }, 
    
  }); 
}
  async deleteUser(id: string){
    return this.prisma.user.delete({
      where: { id: id },
    });
  }
  //houssine ------
  async findAllUsers() {
    return await this.prisma.user.findMany();
  }
  async getValideUsers(senderId: string) {
    const users = await this.prisma.user.findMany();

    const blockerUsers = await this.prisma.blockedUser.findMany({
      where: {
        OR: [{ senderId: senderId }, { receivedId: senderId }],
      },
    });

    const temp = users.filter((user) => {
      if (user.id === senderId) return false;
      const found = blockerUsers.find((elm) => {
        return (
          (senderId === elm.senderId && user.id === elm.receivedId) ||
          (senderId === elm.receivedId && user.id === elm.senderId)
        );
      });
      if (found) return false;
      return true;
    });

    const result = await Promise.all(
      temp.map(async (user) => {
        let friends = await this.prisma.friend.findFirst({
          where: {
            OR: [
              {
                senderId: senderId,
                receivedId: user.id,
              },
              {
                senderId: user.id,
                receivedId: senderId,
              },
            ],
          },
        });
        if (friends) return { ...user, friendship: 1 }; // friends
        let freiReq = await this.prisma.friendRequest.findFirst({
          where: {
            senderId: user.id,
            receivedId: senderId,
          },
        });
        if (freiReq) return { ...user, friendship: 2 }; //  user that I sent a friend request
        let sendReq = await this.prisma.friendRequest.findFirst({
          where: {
            senderId: senderId,
            receivedId: user.id,
          },
        });
        if (sendReq) return { ...user, friendship: 3 };  // user who sent a friend request 
        return { ...user, friendship: 0 }; // user
      })
    );
    return result;
  }

  async getUserGeust(id: string){
    const user = this.findById(id);
    return {
      isUser: true,
      id: user.id,
      nickname: user.nickname,
      profilePic: user.profilePic,
      status: user.status,
      lastSee: user.lastSee,
      lenUser: 0,
      lenUserLive: 0,
    };
  }
  // findById(id: string) {
  //   throw new Error('Method not implemented.');
  // }

  async getChannelGeust(id: string) {
    const channel = await this.channelService.findChannelById(id);
    const members = await this.prisma.channelMember.findMany({ where: { channelId: id } });
    return {
      isUser: false,
      id: channel.id,
      nickname: channel.channelName,
      profilePic: channel.avatar,
      status: Status.INACTIF,
      lastSee: channel.createdAt,
      lenUser: members.length,
    };
  }
}


