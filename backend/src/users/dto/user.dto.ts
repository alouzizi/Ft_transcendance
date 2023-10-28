import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;
  @IsString()
  nickname: string;
  
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UpdateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}