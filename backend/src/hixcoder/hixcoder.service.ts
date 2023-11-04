import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2";
import { isEmpty } from "class-validator";

@Injectable()
export class HixcoderService {
  constructor(private prisma: PrismaService) {}

  // ==========================  Gets ==========================
  async getAllUsers(senderId: number) {
    // await this.test_createManyUsers();
    // await this.test_giveFriendsToUser(1);
    try {
      const allUsers = await this.prisma.user.findMany({
        where: {
          NOT: {
            id: senderId,
          },
        },
      });
      return allUsers;
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async getOneUser(recieverId: string) {
    try {
      const oneUser = await this.prisma.user.findFirst({
        where: {
          username: recieverId,
        },
      });
      return oneUser;
    } catch (error) {
      console.log("getOneUser error: ", error);
      return null;
    }
  }

  async getOnlineFriends(senderId: number) {
    try {
      const allFriends = await this.getAllFriends(senderId);
      const onlineFriends = [];
      for (const element of allFriends) {
        if (element.status === "ACTIF") {
          onlineFriends.push(element);
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
      const [allFriendsTmp1, allFriendsTmp2] = await Promise.all([
        this.prisma.friend.findMany({
          where: {
            senderId: senderId,
          },
        }),
        this.prisma.friend.findMany({
          where: {
            receivedId: senderId,
          },
        }),
      ]);

      const allFriendsIds = [
        ...allFriendsTmp1.map((friend) => friend.receivedId),
        ...allFriendsTmp2.map((friend) => friend.senderId),
      ];
      const allFriends = await this.prisma.user.findMany({
        where: {
          id: {
            in: allFriendsIds,
          },
        },
      });
      return allFriends;
    } catch (error) {
      console.log("error: ", error);
      return null;
    }
  }

  async getPendingFriends(senderId: number) {
    try {
      const [pendingFriendsTmp1, pendingFriendsTmp2] = await Promise.all([
        this.prisma.friendRequest.findMany({
          where: {
            senderId: senderId,
          },
        }),
        this.prisma.friendRequest.findMany({
          where: {
            receivedId: senderId,
          },
        }),
      ]);

      const pendingFriendsIds = [
        ...pendingFriendsTmp1.map((friend) => friend.receivedId),
        ...pendingFriendsTmp2.map((friend) => friend.senderId),
      ];

      const pendingFriends = await this.prisma.user.findMany({
        where: {
          id: {
            in: pendingFriendsIds,
          },
        },
      });
      const formattedPendingFriends = pendingFriends.map((friend) => {
        const isYouSender1 = pendingFriendsTmp1.find(
          (item) => item.receivedId === friend.id
        );
        const isYouSender2 = pendingFriendsTmp2.find(
          (item) => item.senderId === friend.id
        );
        return {
          ...friend,
          isYouSender: isYouSender1 ? true : isYouSender2 ? false : null,
        };
      });
      return formattedPendingFriends;
    } catch (error) {
      console.log("error: ", error);
      return null;
    }
  }

  async getBlockedFriends(senderId: number) {
    try {
      const blockedFriendsTmp = await this.prisma.blockedUser.findMany({
        where: {
          senderId: senderId,
        },
      });
      const blockedFriends = [];
      for (const element of blockedFriendsTmp) {
        const user = await this.prisma.user.findUnique({
          where: {
            id: element.receivedId,
          },
        });
        if (!isEmpty(user)) {
          console.log(user);
          blockedFriends.push(user);
        }
      }
      return blockedFriends;
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async getAllPossibleFriends(senderId: number) {
    try {
      const allUsers = await this.prisma.user.findMany({
        where: {
          NOT: {
            id: senderId,
          },
        },
      });
      const allFriends = await this.prisma.friend.findMany({
        where: {
          OR: [
            {
              senderId: senderId,
            },
            {
              receivedId: senderId,
            },
          ],
        },
      });
      const blockedFriendsTmp = await this.prisma.blockedUser.findMany({
        where: {
          OR: [
            {
              senderId: senderId,
            },
            {
              receivedId: senderId,
            },
          ],
        },
      });
      const possibleFriends = allUsers.filter((user) => {
        const isFriend = allFriends.some(
          (friend) =>
            friend.senderId === user.id || friend.receivedId === user.id
        );
        const isBlocked = blockedFriendsTmp.some(
          (blocked) =>
            blocked.senderId === user.id || blocked.receivedId === user.id
        );
        return !isFriend && !isBlocked;
      });
      return possibleFriends;
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  // ==========================  Posts ==========================

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

  async acceptFriendRequest(senderId: number, recieverId: number) {
    try {
      const userToAccept = await this.prisma.friendRequest.findUnique({
        where: {
          Unique_Sender_Receiver: {
            senderId: recieverId,
            receivedId: senderId,
          },
        },
      });
      console.log("userToAccept : ", userToAccept);
      if (userToAccept) {
        const user = await this.prisma.friend.create({
          data: {
            senderId: senderId,
            receivedId: recieverId,
          },
        });
        console.log();
        await this.prisma.friendRequest.delete({
          where: {
            Unique_Sender_Receiver: {
              senderId: recieverId,
              receivedId: senderId,
            },
          },
        });
        return user;
      }
      return { error: "null" };
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async unsendFriendRequest(senderId: number, recieverId: number) {
    try {
      const user = await this.prisma.friendRequest.delete({
        where: {
          Unique_Sender_Receiver: {
            senderId: senderId,
            receivedId: recieverId,
          },
        },
      });
      return user;
    } catch (error) {
      return {
        error: error,
      };
    }
  }
  async rejectFriendRequest(senderId: number, recieverId: number) {
    try {
      const user = await this.prisma.friendRequest.delete({
        where: {
          Unique_Sender_Receiver: {
            senderId: recieverId,
            receivedId: senderId,
          },
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
      await this.prisma.friend.deleteMany({
        where: {
          OR: [
            {
              senderId: recieverId,
              receivedId: senderId,
            },
            {
              senderId: senderId,
              receivedId: recieverId,
            },
          ],
        },
      });

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
      const user = await this.prisma.blockedUser.delete({
        where: {
          Unique_Sender_Receiver: {
            senderId: senderId,
            receivedId: recieverId,
          },
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
      const friendToDelete = await this.prisma.friend.findMany({
        where: {
          OR: [
            {
              senderId: recieverId,
              receivedId: senderId,
            },
            {
              senderId: senderId,
              receivedId: recieverId,
            },
          ],
        },
      });

      // Delete the friend
      for (const element of friendToDelete) {
        const user = await this.prisma.friend.delete({
          where: {
            id: element.id,
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
