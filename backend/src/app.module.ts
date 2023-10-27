import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./user/user.module";
import { MessagesModule } from "./messages/messages.module";
import { FriendshipModule } from "./friendship/friendship.module";
import { GameController } from './game/game.controller';
import { Game } from './game/game';
import { GameService } from './game/game.service';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    MessagesModule,
    FriendshipModule,
    GameModule,
  ],
  controllers: [GameController],
  providers: [Game, GameService],
})
export class AppModule {}
