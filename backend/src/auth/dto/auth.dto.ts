import { IsEmail, IsString } from 'class-validator';

export class Authdto {
  @IsString()
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}
