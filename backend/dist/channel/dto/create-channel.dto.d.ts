import { Status } from "@prisma/client";
declare enum ChannelType {
    Public = "Public",
    Private = "Private"
}
export declare class CreateChannelDto {
    channleName: string;
    channelType: ChannelType;
    channlePassword: string;
    channelMember: string[];
    avatar: string;
    channelOwnerId: string;
    protected: boolean;
}
export declare class memberChannelDto {
    userId: string;
    nickname: string;
    profilePic: string;
    role: string;
    status: Status;
}
export {};
