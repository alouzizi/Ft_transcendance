import { ChannelType } from "@prisma/client";
export declare class CreateChannelDto {
    channleName: string;
    channelType: ChannelType;
    channlePassword: string;
    channelMember: string[];
}
export declare class memberChannelDto {
    userId: string;
    nickname: string;
    profilePic: string;
    status: string;
}
