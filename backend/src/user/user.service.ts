import { Injectable, ConflictException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/user.dto";
import { hash as dd } from "bcrypt";
import { MessagesService } from "src/messages/messages.service";

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private messagesService: MessagesService
  ) { }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

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
        if (friends) return { ...user, friendship: 1 };
        let freiReq = await this.prisma.friendRequest.findFirst({
          where: {
            senderId: user.id,
            receivedId: senderId,
          },
        });
        if (freiReq) return { ...user, friendship: 2 };
        let sendReq = await this.prisma.friendRequest.findFirst({
          where: {
            senderId: senderId,
            receivedId: user.id,
          },
        });
        if (sendReq) return { ...user, friendship: 3 };
        return { ...user, friendship: 0 };
      })
    );
    return result;
  }

  async getUserForMsg(senderId: string) {
    const users = await this.prisma.user.findMany();
    const usersMsg = await this.prisma.directMessage.findMany({
      where: {
        OR: [{ senderId: senderId }, { receivedId: senderId }],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const distinctUserIds = new Set<string>();
    for (const msg of usersMsg) {
      if (msg.senderId === senderId) {
        distinctUserIds.add(msg.receivedId);
      } else {
        distinctUserIds.add(msg.senderId);
      }
    }
    const idUsersArray = Array.from(distinctUserIds);
    const usersMsgList = idUsersArray.map((id) =>
      users.find((user) => user.id === id)
    );
    let lastMsgs = [];
    for (let i = 0; i < usersMsgList.length; i++) {
      const temp = await this.messagesService.getLastMessages(
        senderId,
        usersMsgList[i].id
      );
      lastMsgs.push(temp);
    }
    return { usersMsgList, lastMsgs };
  }



  // saliha -------------------

  async createUser(user1: any) {
    console.log("my user iss", user1.intra_id);
    const user = await this.prisma.user.create({
      data: {
        intra_id: user1.intra_id.toString(),
        nickname: user1.login42.toString(),
        email: user1.email.toString(),
        profilePic: user1.profilePicture.toString(),
        last_name: user1.last_name,
        first_name: user1.first_name
      },

    });
    console.log("prisma user is ", user)
    return user;
  }

  async findByIntraId(intra_id: string) {
    return this.prisma.user.findUnique({
      where: { intra_id: intra_id },
    });
  }

}
