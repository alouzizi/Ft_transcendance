// import { ChannelType } from "@prisma/client";

import { Status } from "@prisma/client";




enum ChannelType {
    Public = 'Public',
    Private = 'Private'
}

export class CreateChannelDto {
    channelName: string;
    channelType: ChannelType;
    channelPassword: string;
    channelMember: string[];
    avatar: string;
    channelOwnerId: string;
    protected: boolean;
}

export class memberChannelDto {
    userId: string;
    nickname: string;
    profilePic: string;
    role: string;
    status: Status;
    unmuted_at: number;
}