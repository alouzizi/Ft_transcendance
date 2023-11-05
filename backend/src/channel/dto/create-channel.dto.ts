// import { ChannelType } from "@prisma/client";




enum ChannelType {
    Public = 'Public',
    Private = 'Private'
}

export class CreateChannelDto {
    channleName: string;
    channelType: ChannelType;
    channlePassword: string;
    channelMember: string[];
    avatar: string;
    channelOwnerId: string;
    protected: boolean;
}

export class memberChannelDto {
    userId: string;
    nickname: string;
    profilePic: string;
    status: string;
}