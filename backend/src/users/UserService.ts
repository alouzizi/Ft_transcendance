import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

   async getUsers() {
    return this.prisma.user.findMany();
  }
  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { Email: email } });
  }
  async getUserByLogin(name: string) {
    return this.prisma.user.findUnique({ where: { Login: name } });
  }

    // async createUser(userDetail: CreateUserParams) {
    // const existingUser = await this.prisma.user.findFirst({
    //   where: {
    //     OR: [
    //       { Login: userDetail.Login },
    //       { Email: userDetail.Email },
    //     ],
    //   },
    // });
  async createUser(data: Prisma.UserCreateInput){
    
    // const userData: Prisma.UserCreateInput = {
    //   first_name: data.first_name,
    //   last_name: data.last_name,
    // };

    if (existringUser){
      return null;
    }
     const saltOrRounds = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userDetail.Password, saltOrRounds);
  //   return this.prisma.user.create({ Data });
  // }
     return this.prisma.user.create({
      data: {
        ...userDetail,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
        Status: 'offline',
        Password: hashedPassword,
      },
    });
  }
  
  async getUserById(id: string){
    return this.prisma.user.findUnique({
      where: { intra_id: id },
    });
  }

   // async updateUser(userDetail: UpdateUserDto, user: User) {
   //  const oldUser = await this.prisma.user.findUnique({
   //    where: { Login: user.Login },
   //  });

    // if (!oldUser) {
    //   return null; // Handle user not found error
    // }

    // const updatedUser = await this.prisma.user.update({
    //   where: { Id: oldUser.Id },
    //   data: { ...oldUser, ...userDetail },
    // });

  // if (userDetail?.Login) {
  //     const payload = {
  //       Login: updatedUser.Login,
  //       Id: updatedUser.Id,
  //       Status: updatedUser.Status,
  //     };

  //     return {
  //       access_token: await this.jwtService.sign(payload),
  //     };
  //   }

  //   return { data: updatedUser };
  // }
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

