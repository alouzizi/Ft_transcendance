import { Status } from "@prisma/client";
import { IsEmail, IsString } from "class-validator";

<<<<<<< HEAD
=======


>>>>>>> implement the sockets successfully
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
<<<<<<< HEAD
=======





export class MessageItemList {
  isDirectMessage: Boolean;

  name: string;
  avatar: string;
  lastMsg: string;
  createdAt: Date;

  status: Status;

  id: string; // id user geust or id channel 
  nameSenderChannel: string;
}

>>>>>>> implement the sockets successfully
