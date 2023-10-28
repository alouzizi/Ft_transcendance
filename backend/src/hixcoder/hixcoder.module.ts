import { Module } from "@nestjs/common";
import { HixcoderService } from "./hixcoder.service";
import { HixcoderController } from "./hixcoder.controller";

@Module({
  controllers: [HixcoderController],
  providers: [HixcoderService],
})
export class HixcoderModule {}
