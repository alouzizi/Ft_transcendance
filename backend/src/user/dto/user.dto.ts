import { Status } from "@prisma/client";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  hash: string;

  @IsString()
  avatar: string;

  status: Status;

  lastSee: Date;
}
