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





export class MessageItemList {
  isDirectMsg: Boolean;

  name: string;
  avatar: string;
  lastMsg: string;
  createdAt: Date;

  status: Status;

  id: string; // id user geust or id channel 
  nameSenderChannel: string;
}

