import { ChannelType } from "@prisma/client";

export class CreateChannelDto {
    channleName: string;
    channelType: ChannelType;
    channlePassword: string;
    channelMember: string[];
}

