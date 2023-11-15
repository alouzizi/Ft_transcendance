
// notification.dto.ts

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  senderId: string;

  @IsNotEmpty()
  @IsString()
  receivedId: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}



