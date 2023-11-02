import { ChannelType } from "@prisma/client";

export class CreateChannelDto {
    channleName: string;
    channelType: ChannelType;
    channlePassword: string;
    channelMember: string[];
}

export class memberChannelDto {
    userId: string;
    nickname: string;
    profilePic: string;
    status: string;
}