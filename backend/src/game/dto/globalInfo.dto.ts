import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class globalInfoDto {
  NbrOfAllMatches: number;
  NbrOfWinnedMatches: number;
  NbrOfLosedMatches: number;
  NbrOfFriends: number;
  NbrOfBlockedFriends: number;
  NbrOfInvitedFriends: number;
}
