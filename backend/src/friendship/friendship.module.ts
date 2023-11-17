import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendshipController } from './friendship.controller';

@Module({
  controllers: [FriendshipController],
  providers: [FriendshipService],
})
<<<<<<< HEAD
export class FriendshipModule {}
=======
export class FriendshipModule {}
>>>>>>> origin/lhoussin
