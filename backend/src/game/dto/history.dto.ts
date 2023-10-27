import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class HistoryDto {
  @IsNotEmpty()
  @IsNumber()
  userPoints: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  opponentId: number;

  @IsNotEmpty()
  @IsNumber()
  opponentPoints: number;
}
