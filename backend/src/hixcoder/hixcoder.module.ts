import { Module } from "@nestjs/common";
import { HixcoderService } from "./hixcoder.service";
import { HixcoderController } from "./hixcoder.controller";

@Module({
  controllers: [HixcoderController],
  providers: [HixcoderService],
})
<<<<<<< HEAD
export class HixcoderModule {}
=======
export class HixcoderModule { }
>>>>>>> implement the sockets successfully
