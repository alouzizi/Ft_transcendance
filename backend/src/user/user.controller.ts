import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtGuard } from "src/auth/guard";
import { User } from "@prisma/client";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  // @UseGuards(JwtGuard)
  @Get(":id")
  async getUserProfile(@Param("id") id: string) {
    return await this.userService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Get("/intra/:id_intra")
  async getUserByIdintr(@Param("id_intra") id_intra: string) {
    const user: User = await this.userService.findByIntraId(id_intra);
    const temp = {
      id: user.id,
      intra_id: user.intra_id,
      first_name: user.first_name,
      last_name: user.last_name,
      nickname: user.nickname,
      profilePic: user.profilePic,
      isTwoFactorAuthEnabled: user.isTwoFactorAuthEnabled,
    };
    return temp;
  }

  // @UseGuards(JwtGuard)
  @Get("/all")
  async getAllUser() {
    return await this.userService.findAllUsers();
  }

  @Get("/getValideUsers/:id")
  async getValideUsers(@Param("id") senderId: string) {
    return await this.userService.getValideUsers(senderId);
  }

  @Post("updatUserdata/:intra_id/:nickname/:image")
  @UseGuards(JwtGuard)
  async updatUserdata(
    @Param("intra_id") intra_id: string,
    @Param("nickname") nickname: string,
    @Param("image") image: string
  ) {
    return await this.userService.updatUserdata(intra_id, nickname, image);
  }

  @Post("/:intra_id/uploadImage")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    })
  )
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param("intra_id") senderId: string
  ) {
    return this.userService.uploadImage(senderId, file.path);
  }

  @Get("/getUsersCanJoinChannel/:senderId/:channelId")
  async getUsersCanJoinChannel(
    @Param("senderId") senderId: string,
    @Param("channelId") channelId: string
  ) {
    return await this.userService.usersCanJoinChannel(senderId, channelId);
  }

  @Get("getUserGeust/:id")
  async getUserGeust(@Param("id") id: string) {
    return await this.userService.getUserGeust(id);
  }

  @Get("getChannelGeust/:id")
  async getChannelGeust(@Param("id") id: string) {
    return await this.userService.getChannelGeust(id);
  }

  @Get("checkIsBlocked/:senderId/:receivedId")
  async checkIsBlocked(
    @Param("senderId") senderId: string,
    @Param("receivedId") receivedId: string
  ) {
    return await this.userService.checkIsBlocked(senderId, receivedId);
  }
}
