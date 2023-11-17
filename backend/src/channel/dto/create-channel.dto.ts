<<<<<<< HEAD
import { ChannelType } from "@prisma/client";

export class CreateChannelDto {
    channleName: string;
    channelType: ChannelType;
    channlePassword: string;
    channelMember: string[];
}

=======
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
    inviteLink: string;
}

export class memberChannelDto {
    userId: string;
    nickname: string;
    profilePic: string;
    role: string;
    status: Status;
    unmuted_at: number;
}
>>>>>>> origin/lhoussin
