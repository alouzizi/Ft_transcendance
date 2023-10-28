import { HixcoderService } from "./hixcoder.service";
export declare class HixcoderController {
    private hixcoderService;
    constructor(hixcoderService: HixcoderService);
    getOnlineFriends(): Promise<{
        data: {
            id: number;
            senderId: number;
            receivedId: number;
        }[];
        error?: undefined;
    } | {
        error: string;
        data?: undefined;
    }>;
}
