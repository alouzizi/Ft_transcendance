import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { User } from "@prisma/client";
import { diskStorage } from "multer";
import { JwtGuard } from "src/auth/guard";
import { UserService } from "./user.service";
import sharp from "sharp";

@Controller("user")
export class UserController {
  constructor(private userService: UserService,) {

  }

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
      level: user.level,
      inGaming: user.inGaming
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

  @Post("updatUserdata/:intra_id/:nickname")
  @UseGuards(JwtGuard)
  async updatUserdata(
    @Param("intra_id") intra_id: string,
    @Param("nickname") nickname: string,
  ) {
    return await this.userService.updatUserdata(intra_id, nickname);
  }

  @Post("/:intra_id/uploadImage")
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const name = file.originalname.split(".")[0];
        const fileExtension = file.originalname.split(".")[1];
        const newFileName = name.split(" ").join("_") + "_" + Date.now() + "." + fileExtension;
        cb(null, newFileName);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
        return cb(null, false);

      cb(null, true);
    }
  }))
  uploadImage(@UploadedFile() file: Express.Multer.File,
    @Param("intra_id") senderId: string
  ) {
    // const roundedCornerResizer = sharp()
    //   .resize(200, 200)
    //   .toBuffer();
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

  @Post("startGameing/:senderId")
  async startGameing(
    @Param("senderId") senderId: string,
  ) {
    return await this.userService.startGameing(senderId);
  }

  @Post("finishGaming/:senderId")
  async finishGaming(
    @Param("senderId") senderId: string,
  ) {
    return await this.userService.finishGaming(senderId);
  }

}




