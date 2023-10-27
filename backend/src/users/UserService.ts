import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';



@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(data: Prisma.UserCreateInput){
    
    // const userData: Prisma.UserCreateInput = {
    //   first_name: data.first_name,
    //   last_name: data.last_name,
    // };
    return this.prisma.user.create({ Data });
  }

  async getUserById(id: string){
    return this.prisma.user.findUnique({
      where: { intra_id: id },
    });
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput){
    return this.prisma.user.update({
      where: { id: id },
      data,
    });
  }
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
  // async registerUser(profile: profile) {
  //     // Implement user registration logic, e.g., adding the user to your data store
  //     // Be sure to customize this based on your needs
  //     const newUser = { id: profile.intra_id, name: profile.first_name, email: profile.email };
  //     this.users.push(newUser);
  //     return newUser;
  // }

