import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2";
import { isEmpty } from "class-validator";

@Injectable()
export class HixcoderService {
  constructor(private prisma: PrismaService) {}

  async getOnlineFriends(senderId: number) {
    try {
      const allFriends = await this.prisma.friend.findMany({
        where: {
          senderId: senderId,
        },
      });
      const onlineFriends = [];
      for (const element of allFriends) {
        const user = await this.prisma.user.findUnique({
          where: {
            id: element.receivedId,
            status: "ACTIF",
          },
        });
        if (!isEmpty(user)) {
          console.log(user);
          onlineFriends.push(user);
        }
      }
      return onlineFriends;
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async getAllFriends(senderId: number) {
    try {
      // this.test_giveFriendsToUser(1);
      // const allFriends = await this.prisma.friend.findMany();
      const allFriends = await this.prisma.friend.findMany({
        where: {
          senderId: senderId,
        },
      });
      const onlineFriends = [];
      for (const element of allFriends) {
        const user = await this.prisma.user.findUnique({
          where: {
            id: element.receivedId,
          },
        });
        if (!isEmpty(user)) {
          console.log(user);
          onlineFriends.push(user);
        }
      }
      return onlineFriends;
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async getPendingFriends(senderId: number) {
    try {
      const pendingFriends = await this.prisma.friendRequest.findMany({
        where: {
          senderId: senderId,
        },
      });

      return pendingFriends;
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async getBlockedFriends(senderId: number) {
    try {
      const blockedFriends = await this.prisma.blockedUser.findMany({
        where: {
          senderId: senderId,
        },
      });

      return blockedFriends;
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async sendFriendRequest(senderId: number, recieverId: number) {
    try {
      const user = await this.prisma.friendRequest.create({
        data: {
          senderId: senderId,
          receivedId: recieverId,
        },
      });
      return user;
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async blockFriend(senderId: number, recieverId: number) {
    try {
      // Find the friend that you want to delete
      const friendToDelete = await this.prisma.friend.findUnique({
        where: {
          Unique_Sender_Receiver: {
            senderId: senderId,
            receivedId: recieverId,
          },
        },
      });

      // Delete the friend
      if (friendToDelete) {
        await this.prisma.friend.delete({
          where: {
            id: friendToDelete.id,
          },
        });
      }

      // Add the friend to blockedUser table
      const user = await this.prisma.blockedUser.create({
        data: {
          senderId: senderId,
          receivedId: recieverId,
        },
      });
      return user;
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async unblockFriend(senderId: number, recieverId: number) {
    try {
      // Find the friend that you want to delete
      const friendToUnblock = await this.prisma.blockedUser.findUnique({
        where: {
          Unique_Sender_Receiver: {
            senderId: senderId,
            receivedId: recieverId,
          },
        },
      });

      // unblock the friend
      if (friendToUnblock) {
        await this.prisma.blockedUser.delete({
          where: {
            id: friendToUnblock.id,
          },
        });
      }

      // Add the friend to blockedUser table
      const user = await this.prisma.friend.create({
        data: {
          senderId: senderId,
          receivedId: recieverId,
        },
      });
      return user;
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async removeFriend(senderId: number, recieverId: number) {
    try {
      // Find the friend that you want to delete
      const friendToDelete = await this.prisma.friend.findUnique({
        where: {
          Unique_Sender_Receiver: {
            senderId: senderId,
            receivedId: recieverId,
          },
        },
      });

      // Delete the friend
      if (friendToDelete) {
        const user = await this.prisma.friend.delete({
          where: {
            id: friendToDelete.id,
          },
        });
        return user;
      }
      return friendToDelete;
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  // ====================== TEST FUNCTIONS ======================
  async test_giveFriendsToUser(userId: number) {
    const allUsers = await this.prisma.user.findMany();

    for (const otherUser of allUsers) {
      if (userId === otherUser.id) {
        continue;
      }
      await this.prisma.friend.create({
        data: {
          senderId: userId,
          receivedId: otherUser.id,
        },
      });
    }
    const result = await this.prisma.friend.findMany();
    return result;
  }

  async test_createManyUsers() {
    const index = Math.floor(Math.random() * 100) + 1;
    const hash = await argon.hash("1234");
    const myData = [
      {
        email: "fsdf@gmail.com",
        hash: hash,
        avatar: `https://randomuser.me/api/portraits/women/${index}.jpg`,
        username: "kkkfds",
      },
      {
        email: "john_smith@gmail.com",
        hash: hash,
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        username: "johnsmith1",
      },
      {
        email: "jane_doe@gmail.com",
        hash: hash,
        avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        username: "janedoe2",
      },
      {
        email: "michael_williams@gmail.com",
        hash: hash,
        avatar: "https://randomuser.me/api/portraits/men/6.jpg",
        username: "michaelwilliams3",
      },
      {
        email: "emily_johnson@gmail.com",
        hash: hash,
        avatar: "https://randomuser.me/api/portraits/women/7.jpg",
        username: "emilyjohnson4",
      },
      {
        email: "alex_smith@gmail.com",
        hash: hash,
        avatar: "https://randomuser.me/api/portraits/men/8.jpg",
        username: "alexsmith5",
      },
      {
        email: "sarah_davis@gmail.com",
        hash: hash,
        avatar: "https://randomuser.me/api/portraits/women/9.jpg",
        username: "sarahdavis6",
      },
      {
        email: "robert_wilson@gmail.com",
        hash: hash,
        avatar: "https://randomuser.me/api/portraits/men/10.jpg",
        username: "robertwilson7",
      },
      {
        email: "olivia_jones@gmail.com",
        hash: hash,
        avatar: "https://randomuser.me/api/portraits/women/11.jpg",
        username: "oliviajones8",
      },
      {
        email: "william_brown@gmail.com",
        hash: hash,
        avatar: "https://randomuser.me/api/portraits/men/12.jpg",
        username: "williambrown9",
      },
      {
        email: "ava_miller@gmail.com",
        hash: hash,
        avatar: "https://randomuser.me/api/portraits/women/13.jpg",
        username: "avamiller10",
      },
    ];
    const users = await this.prisma.user.createMany({
      data: myData,
    });

    console.log(users);
  }
}
