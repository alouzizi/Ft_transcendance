import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common";
import { AuthDto } from "src/auth/dto";
import { HixcoderService } from "./hixcoder.service";

@Controller("hixcoder")
export class HixcoderController {
  constructor(private hixcoderService: HixcoderService) {}

  @Get("onlineFriends")
  async getOnlineFriends() {
    try {
      const onlineFriends = await this.hixcoderService.getOnlineFriends();
      return {
        data: onlineFriends,
      };
    } catch (error) {
      // Handle any errors that may occur during the retrieval of online friends
      return {
        error: "An error occurred while fetching online friends.",
      };
    }
  }
}
