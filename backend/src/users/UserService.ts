import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, PrismaClient} from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService
  ){}


  async createUser(user1:any){
    console.log("my user iss",user1.intra_id);
    const user = await this.prisma.user.create({
      data:{
        intra_id:user1.intra_id.toString(),
        nickname:user1.login42.toString(),
        email:user1.email.toString(),
        profilePic:user1.profilePicture.toString(),
        last_name:user1.last_name,
        first_name:user1.first_name,
        level:parseFloat(user1.level.toString()),
        grade:user1.grade.toString()
      },
    
    });
    console.log("prisma user is ",user)
    return user;
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
  // async updateUser(id: string, data: Prisma.UserUpdateInput){
  //   return this.prisma.user.update({
  //     where: { id: id },
  //     data,
  //   });
  // }
async findByIntraId(intra_id: string){
  return this.prisma.user.findUnique({
    where: { intra_id: intra_id },
    
  });
}
  async deleteUser(id: string){
    return this.prisma.user.delete({
      where: { id: id },
    });
  }
}


