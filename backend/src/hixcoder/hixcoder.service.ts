import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { isEmpty } from "class-validator";
import { globalInfoDto } from "./dto";
import { GameHistory, User } from "@prisma/client";

@Injectable()
export class HixcoderService {
  constructor(private prisma: PrismaService) {}

  // ==========================  Gets ==========================
  async getAllUsers(senderId: string) {
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

  async getUserByNick(recieverUsr: string) {
    try {
      const oneUser = await this.prisma.user.findFirst({
        where: {
          nickname: recieverUsr,
        },
      });
      return oneUser;
    } catch (error) {
      console.log("getUserByNick error: ", error);
      return null;
    }
  }

  async getIsBlocked(recieverId: string, senderId: string) {
    try {
      const isBlocked = await this.prisma.blockedUser.findFirst({
        where: {
          OR: [
            {
              senderId: senderId,
              receivedId: recieverId,
            },
            {
              senderId: recieverId,
              receivedId: senderId,
            },
          ],
        },
      });
      if (isBlocked) {
        return {
          isBlocked: true,
        };
      }
      return {
        isBlocked: false,
      };
    } catch (error) {
      console.log("getIsBlocked error: ", error);
      return null;
    }
  }

  async getOnlineFriends(senderId: string) {
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

  async getAllFriends(senderId: string) {
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

  async getPendingFriends(senderId: string) {
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

  async getBlockedFriends(senderId: string) {
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
      console.log("error:", error);
      return null;
    }
  }

  async getAllPossibleFriends(senderId: string) {
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

  async getNavSearchUsers(senderId: string) {
    try {
      const allUsers = await this.prisma.user.findMany({
        where: {
          NOT: {
            id: senderId,
          },
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
        const isBlocked = blockedFriendsTmp.some(
          (blocked) =>
            blocked.senderId === user.id || blocked.receivedId === user.id
        );
        return !isBlocked;
      });
      return possibleFriends;
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  // ==========================  Posts ==========================

  async sendFriendRequest(senderId: string, recieverId: string) {
    try {
      const isPending = await this.prisma.friendRequest.findFirst({
        where: {
          OR: [
            {
              senderId: senderId,
              receivedId: recieverId,
            },
            {
              senderId: recieverId,
              receivedId: senderId,
            },
          ],
        },
      });
      if (isPending) {
        return null;
      }
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

  async acceptFriendRequest(senderId: string, recieverId: string) {
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

  async unsendFriendRequest(senderId: string, recieverId: string) {
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
  async rejectFriendRequest(senderId: string, recieverId: string) {
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

  async blockFriend(senderId: string, recieverId: string) {
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

  async unblockFriend(senderId: string, recieverId: string) {
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

  async removeFriend(senderId: string, recieverId: string) {
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

  // ==========================    ****    ==========================
  // ==========================    ****    ==========================
  // ==========================    ****    ==========================
  // ==========================    ****    ==========================
  // ==========================    ****    ==========================
  // ==========================    ****    ==========================
  // ==========================    ****    ==========================
  // ==========================  Game Gets ==========================

  async getGameHistory(senderId: string) {
    try {
      const allUsers = await this.prisma.user.findMany();
      const users = await this.prisma.gameHistory.findMany({
        where: {
          OR: [
            {
              receiverId: senderId,
            },
            {
              senderId: senderId,
            },
          ],
        },
      });

      const usersWithAvatar = users.map((user) => {
        const receiver = allUsers.find((item) => item.id === user.receiverId);
        const sender = allUsers.find((item) => item.id === user.senderId);
        return {
          ...user,
          receiverAvatar: receiver.profilePic,
          senderAvatar: sender.profilePic,
          receiverUsr: receiver.nickname,
          senderUsr: sender.nickname,
        };
      });
      return usersWithAvatar;
    } catch (error) {
      console.log("error:", error);
      return [];
    }
  }

  isWined(record: GameHistory, isWined: boolean, user: User) {
    let senderId = record.receiverId;
    let receiverId = record.senderId;
    let senderPoints = record.senderPoints;
    let receiverPoints = record.receiverPoints;
    if (isWined) {
      senderId = record.receiverId;
      receiverId = record.senderId;
      senderPoints = record.receiverPoints;
      receiverPoints = record.senderPoints;
    }
    if (senderId === user.id) {
      return parseInt(senderPoints) > parseInt(receiverPoints);
    } else if (receiverId === user.id) {
      return parseInt(senderPoints) < parseInt(receiverPoints);
    }
  }

  async getUserById(recieverId: string) {
    try {
      const oneUser = await this.prisma.user.findFirst({
        where: {
          id: recieverId,
        },
      });
      return oneUser;
    } catch (error) {
      console.log("getUserById error: ", error);
      return null;
    }
  }

  async getNbrOfMatches(recieverId: string, isWined: number) {
    const user = await this.getUserById(recieverId);
    const gamesHistory = await this.getGameHistory(recieverId);
    let NbrOfMatches = 0;
    if (gamesHistory) {
      NbrOfMatches = gamesHistory.length;
      if (isWined === 1) {
        NbrOfMatches = gamesHistory.filter((record) =>
          this.isWined(record, true, user)
        ).length;
      } else if (isWined === 0) {
        NbrOfMatches = gamesHistory.filter((record) =>
          this.isWined(record, false, user)
        ).length;
      }
    }

    return NbrOfMatches;
  }
  catch(error) {
    return {
      error: error,
    };
  }

  async getGlobalInfos(recieverId: string) {
    try {
      const globInfo: globalInfoDto = {
        NbrOfAllMatches: 0,
        NbrOfWinnedMatches: 0,
        NbrOfLosedMatches: 0,
        NbrOfFriends: 0,
        NbrOfBlockedFriends: 0,
        NbrOfInvitedFriends: 0,
      };
      const user = await this.getUserById(recieverId);
      const gamesHistory = await this.getGameHistory(recieverId);
      if (gamesHistory) {
        globInfo.NbrOfAllMatches = gamesHistory.length;
        globInfo.NbrOfWinnedMatches = gamesHistory.filter((record) =>
          this.isWined(record, true, user)
        ).length;
        globInfo.NbrOfLosedMatches = gamesHistory.filter((record) =>
          this.isWined(record, false, user)
        ).length;
      }
      const allFriends = await this.getAllFriends(user.id);
      if (allFriends) {
        globInfo.NbrOfFriends = allFriends.length;
      }
      const allBlocked = await this.getBlockedFriends(user.id);
      if (allBlocked) {
        globInfo.NbrOfBlockedFriends = allBlocked.length;
      }
      const allInvited = await this.getPendingFriends(user.id);
      if (allInvited) {
        globInfo.NbrOfInvitedFriends = allInvited.length;
      }
      return globInfo;
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async getUserRanking(senderId: string) {
    try {
      const allUsers = await this.prisma.user.findMany();
      const usersRank = await Promise.all(
        allUsers.map(async (user) => {
          const userRank = await this.getNbrOfMatches(user.id, 1);

          return {
            userId: user.id,
            winedGames: userRank,
          };
        })
      );
      const sortedData = usersRank.sort((a, b) => b.winedGames - a.winedGames);
      let userRank = { userId: senderId, rank: 0 };
      sortedData.map((item, index) => {
        if (senderId === item.userId) {
          userRank.rank = index + 1;
        }
      });

      return userRank;
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async getLeaderBoard() {
    try {
      const allUsers = await this.prisma.user.findMany();
      const usersRank = await Promise.all(
        allUsers.map(async (user) => {
          const winedGames = await this.getNbrOfMatches(user.id, 1);
          const nbrOfMatches = await this.getNbrOfMatches(user.id, 3);
          let winRate = 0;
          if (nbrOfMatches != 0) {
            winRate = (winedGames * 100) / nbrOfMatches;
          }
          return {
            userName: user.nickname,
            userAvatar: user.profilePic,
            level: user.level,
            nbrOfMatches: nbrOfMatches.toString(),
            winRate: winRate.toFixed(0),
            winedGames: winedGames,
          };
        })
      );
      const sortedData = usersRank.sort((a, b) => b.winedGames - a.winedGames);
      const rankedData = sortedData.map((item, index) => ({
        userName: item.userName,
        userAvatar: item.userAvatar,
        level: item.level,
        nbrOfMatches: item.nbrOfMatches,
        winRate: item.winRate,
        rank: (index + 1).toString(),
      }));
      return rankedData;
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  // ==========================  Game Posts =========================

  async updateGameHistory(
    senderId: string,
    recieverUsr: string,
    senderPt: string,
    recieverPt: string
  ) {
    try {
      const user = await this.prisma.gameHistory.create({
        data: {
          senderId: senderId,
          receiverId: recieverUsr,
          senderPoints: senderPt,
          receiverPoints: recieverPt,
        },
      });
      if (parseInt(senderPt) > parseInt(recieverPt)) {
        this.updateLevelAfterGame(senderId, "0.23");
      }
      if (parseInt(senderPt) < parseInt(recieverPt)) {
        this.updateLevelAfterGame(recieverUsr, "0.23");
      }
      return user;
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async updateLevel(senderId: string, newLevel: string) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: senderId,
        },
        data: {
          level: newLevel,
        },
      });
      return user;
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async updateLevelAfterGame(senderId: string, incrLevelBy: string) {
    try {
      const userT = await this.prisma.user.findUnique({
        where: {
          id: senderId,
        },
      });
      const currentLevel = parseFloat(userT.level);
      const level = currentLevel + parseFloat(incrLevelBy);

      const user = await this.prisma.user.update({
        where: {
          id: senderId,
        },
        data: {
          level: level.toFixed(2),
        },
      });
      return user;
    } catch (error) {
      return {
        error: error,
      };
    }
  }
}
