import { Injectable } from "@nestjs/common";
import {
  BannedMember,
  Channel,
  ChannelMember,
  ChannelType,
  MutedMember,
  Prisma,
  User,
} from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateChannelDto, memberChannelDto } from "./dto/create-channel.dto";
import * as bcrypt from "bcrypt";
import { NotificationService } from "src/notification/notification.service";
import { AES, enc } from "crypto-js";

@Injectable()
export class ChannelService {
  constructor(
    private prisma: PrismaService,
    private readonly notificationService: NotificationService
  ) {}

  async createMessageInfoChannel(
    senderId: string,
    channelId: string,
    userId: string,
    msg: string
  ) {
    const user: User = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    await this.prisma.message.create({
      data: {
        senderId: senderId,
        receivedId: channelId,
        content: user ? `${msg} ${user.nickname}` : `${msg}`,
        isDirectMessage: false,
        InfoMessage: true,
        channelId: channelId,
      },
    });
  }

  decryptMessage = (cipherText: string) => {
    try {
      const bytes = AES.decrypt(cipherText, process.env.CRYPTO_JS_KEY);
      const decrypted = bytes.toString(enc.Utf8);
      return decrypted;
    } catch (err) {}
  };

  async createChannel(createChannelDto: CreateChannelDto, senderId: string) {
    let cipherText = "";
    if (createChannelDto.channelPassword !== "")
      cipherText = AES.encrypt(
        createChannelDto.channelPassword,
        process.env.CRYPTO_JS_KEY
      );

    try {
      const newChannel = await this.prisma.channel.create({
        data: {
          channelOwnerId: senderId,
          channelName: createChannelDto.channelName,
          channelPassword: cipherText.toString(),
          channelType: createChannelDto.channelType,
          protected: createChannelDto.protected,
          avatar:
            "https://cdn.pixabay.com/photo/2020/05/29/13/26/icons-5235125_1280.png",
        },
      });

      this.createMessageInfoChannel(
        senderId,
        newChannel.id,
        "",
        "create group"
      );
      // add Owner
      await this.prisma.channelMember.create({
        data: {
          userId: senderId,
          isAdmin: true,
          channelId: newChannel.id,
        },
      });
      // add members
      const promises = createChannelDto.channelMember.map(
        async (item: string) => {
          this.notificationService.createNotification({
            senderId: senderId,
            recieverId: item,
            subject: "you've been invited to group",
          });

          await this.prisma.channelMember.create({
            data: {
              userId: item,
              isAdmin: false,
              channelId: newChannel.id,
            },
          });
          this.createMessageInfoChannel(senderId, newChannel.id, item, "added");
        }
      );
      await Promise.all(promises);

      return { ...newChannel, status: 200 };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return { status: 202, error: "Name is already used" };
        } else {
          return { error: true };
        }
      }
    }
  }

  async updateChannel(
    senderId: string,
    channelId: string,
    updateChannelDto: CreateChannelDto
  ) {
    try {
      const memberAdmin = await this.prisma.channelMember.findFirst({
        where: {
          channelId: channelId,
          userId: senderId,
          isAdmin: true,
        },
      });
      if (!memberAdmin) return { status: 204, error: "you are not admin" };
      let pass: string = "";
      if (updateChannelDto.channelPassword != "" && updateChannelDto.protected)
        pass = AES.encrypt(
          updateChannelDto.channelPassword,
          process.env.CRYPTO_JS_KEY
        );
      const channelUpdate: Channel = await this.prisma.channel.update({
        where: { id: channelId },
        data: {
          channelName: updateChannelDto.channelName,
          channelPassword: pass.toString(),
          channelType: updateChannelDto.channelType,
          protected: updateChannelDto.protected,
          avatar: updateChannelDto.avatar,
        },
      });
      const userUpdate = await this.prisma.user.findUnique({
        where: { id: senderId },
      });
      this.createMessageInfoChannel(
        senderId,
        channelId,
        "",
        `${userUpdate.nickname}'s update in the channel.`
      );

      let pass2 = "";
      if (channelUpdate.channelPassword !== "")
        pass2 = this.decryptMessage(channelUpdate.channelPassword);
      return {
        status: 200,
        channel: {
          ...channelUpdate,
          channelPassword: pass2,
        },
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return { status: 202, error: "Name is already used" };
        } else {
          return { error: true };
        }
      }
    }
  }

  async uploadImageChannel(senderId: string, channelId: string, path: string) {
    try {
      const member = await this.prisma.channelMember.findFirst({
        where: { channelId: channelId, userId: senderId },
      });
      if (member.isAdmin) {
        await this.prisma.channel.update({
          where: {
            id: channelId,
          },
          data: {
            avatar: process.env.BACK_HOST + `/${path}`,
          },
        });
      }
    } catch (error) {}
  }

  async checkOwnerIsAdmin(senderId: string, channelId: string) {
    try {
      const user: ChannelMember = await this.prisma.channelMember.findUnique({
        where: {
          Unique_userId_channelId: { channelId, userId: senderId },
        },
      });
      if (user) return user.isAdmin;
    } catch (error) {
      return { error: true };
    }
  }

  async addUserToChannel(senderId: string, channelId: string, userId: string) {
    try {
      const admin: ChannelMember = await this.prisma.channelMember.findUnique({
        where: {
          Unique_userId_channelId: { channelId, userId: senderId },
        },
      });
      if (admin.isAdmin) {
        await this.prisma.channelMember.create({
          data: {
            userId: userId,
            isAdmin: false,
            channelId: channelId,
          },
        });
        this.createMessageInfoChannel(senderId, channelId, userId, "added");

        this.notificationService.createNotification({
          senderId: senderId,
          recieverId: userId,
          subject: "you've been invited to group",
        });
      }
    } catch (error) {
      return { error: true };
    }
  }

  async getChannel(senderId: string, channelId: string) {
    try {
      const channel = await this.prisma.channel.findUnique({
        where: {
          id: channelId,
        },
      });

      if (channel) {
        let pass = "";
        if (channel.channelPassword !== "")
          pass = this.decryptMessage(channel.channelPassword);
        return {
          channelName: channel.channelName,
          channelType: channel.channelType,
          channelPassword: pass,
          protected: channel.protected,
          avatar: channel.avatar,
          channelOwnerId: channel.channelOwnerId,
        };
      }
    } catch (error) {
      return { error: true };
    }
  }

  async findChannelById(id: string) {
    try {
      return await this.prisma.channel.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      return { error: true };
    }
  }

  async getMembersBanned(id: string) {
    let result: memberChannelDto[] = [];
    const members = await this.prisma.bannedMember.findMany({
      where: { channelId: id },
    });
    for (const member of members) {
      const user: User = await this.prisma.user.findUnique({
        where: { id: member.userId },
      });
      const temp = {
        userId: member.userId,
        nickname: user.nickname,
        profilePic: user.profilePic,
        role: "banned",
        status: user.status,
        unmuted_at: 0,
      };
      result.push(temp);
    }
    result.sort((a: memberChannelDto, b: memberChannelDto) => {
      return a.nickname.localeCompare(b.nickname);
    });
    return result;
  }

  async getRegularMembers(id: string) {
    let result: memberChannelDto[] = [];
    const channel = await this.prisma.channel.findUnique({ where: { id } });
    const members = await this.prisma.channelMember.findMany({
      where: { channelId: id },
    });
    for (const member of members) {
      const user: User = await this.prisma.user.findUnique({
        where: { id: member.userId },
      });

      const unmuted_at: number = await this.cancelTimeOut(
        member.userId,
        channel.id
      );

      const temp = {
        userId: member.userId,
        nickname: user.nickname,
        profilePic: user.profilePic,
        status: user.status,
        role:
          member.userId === channel.channelOwnerId
            ? "Owner"
            : member.isAdmin
            ? "Admin"
            : "User",
        unmuted_at,
      };
      result.push(temp);
    }
    result.sort((a: memberChannelDto, b: memberChannelDto) => {
      return a.nickname.localeCompare(b.nickname);
    });
    return result;
  }

  async getMembersChannel(id: string) {
    try {
      const bannedMembers: memberChannelDto[] = await this.getMembersBanned(id);
      const regularMembres: memberChannelDto[] =
        await this.getRegularMembers(id);
      return { bannedMembers, regularMembres };
    } catch (error) {
      return { error: true };
    }
  }

  async changeStatusAdmin(senderId: string, channelId: string, userId: string) {
    try {
      const admin: ChannelMember = await this.prisma.channelMember.findUnique({
        where: {
          Unique_userId_channelId: { channelId, userId: senderId },
        },
      });
      const user: ChannelMember = await this.prisma.channelMember.findUnique({
        where: {
          Unique_userId_channelId: { channelId, userId },
        },
      });
      if (admin.isAdmin) {
        const update: ChannelMember = await this.prisma.channelMember.update({
          where: {
            Unique_userId_channelId: { channelId, userId },
          },
          data: {
            isAdmin: !user.isAdmin,
          },
        });
        return true;
      }
      return false;
    } catch (error) {
      return { error: true };
    }
  }

  async leaveChannel(senderId: string, channelId: string) {
    try {
      const channel: Channel = await this.prisma.channel.findUnique({
        where: { id: channelId },
      });
      const members: ChannelMember[] = await this.prisma.channelMember.findMany(
        {
          where: { channelId },
        }
      );
      const user: ChannelMember = await this.prisma.channelMember.findUnique({
        where: {
          Unique_userId_channelId: { channelId, userId: senderId },
        },
      });

      if (user) {
        await this.prisma.channelMember.delete({
          where: { Unique_userId_channelId: { channelId, userId: senderId } },
        });
        this.createMessageInfoChannel(senderId, channelId, "", "left");
        if (members.length === 1) {
          await this.prisma.message.deleteMany({ where: { channelId } });
          await this.prisma.bannedMember.deleteMany({ where: { channelId } });
          await this.prisma.channel.delete({ where: { id: channelId } });
        } else {
          if (channel.channelOwnerId === senderId) {
            let newOwner: ChannelMember =
              await this.prisma.channelMember.findFirst({
                where: { channelId, isAdmin: true },
              });
            if (!newOwner) {
              newOwner = await this.prisma.channelMember.findFirst({
                where: { channelId },
              });
            }
            if (newOwner) {
              const user = await this.prisma.user.findUnique({
                where: { id: newOwner.userId },
              });
              await this.prisma.channel.update({
                where: { id: channelId },
                data: {
                  channelOwnerId: newOwner.userId,
                },
              });
              await this.prisma.channelMember.update({
                where: {
                  Unique_userId_channelId: {
                    channelId,
                    userId: newOwner.userId,
                  },
                },
                data: { isAdmin: true },
              });
            }
          }
        }
        return true;
      }
      return false;
    } catch (error) {
      return { error: true };
    }
  }

  async KickMember(senderId: string, channelId: string, userId: string) {
    try {
      const admin: ChannelMember = await this.prisma.channelMember.findUnique({
        where: {
          Unique_userId_channelId: { channelId, userId: senderId },
        },
      });
      const user: ChannelMember = await this.prisma.channelMember.findUnique({
        where: {
          Unique_userId_channelId: { channelId, userId },
        },
      });
      if (admin.isAdmin && user) {
        await this.prisma.channelMember.delete({
          where: { Unique_userId_channelId: { channelId, userId } },
        });
        this.createMessageInfoChannel(senderId, channelId, userId, "kicked");
        return true;
      }
      return false;
    } catch (error) {
      return { error: true };
    }
  }

  async checkUserIsInChannel(senderId: string, channelId: string) {
    try {
      const check = await this.prisma.channelMember.findFirst({
        where: { userId: senderId, channelId },
      });
      if (check) return true;
      return false;
    } catch (error) {
      return { error: true };
    }
  }

  async changeStatutsBanned(
    senderId: string,
    channelId: string,
    userId: string
  ) {
    try {
      const admin: ChannelMember = await this.prisma.channelMember.findUnique({
        where: {
          Unique_userId_channelId: { channelId, userId: senderId },
        },
      });
      if (admin.isAdmin) {
        const isEXIST = await this.prisma.bannedMember.findUnique({
          where: { Unique_userId_channelId: { channelId, userId } },
        });
        if (isEXIST) {
          await this.prisma.bannedMember.delete({
            where: { Unique_userId_channelId: { channelId, userId } },
          });
          this.createMessageInfoChannel(
            senderId,
            channelId,
            userId,
            "unbanned"
          );
        } else {
          await this.prisma.bannedMember.create({
            data: { userId, channelId },
          });
          await this.prisma.channelMember.delete({
            where: { Unique_userId_channelId: { channelId, userId } },
          });
          this.createMessageInfoChannel(senderId, channelId, userId, "banned");
        }
        return true;
      }
      return false;
    } catch (error) {
      return { error: true };
    }
  }

  async validePassword(senderId: string, channelId: string, password: string) {
    try {
      const channel: Channel = await this.prisma.channel.findUnique({
        where: { id: channelId },
      });

      let pass = "";
      if (channel.channelPassword !== "")
        pass = this.decryptMessage(channel.channelPassword);
      if (pass === password) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return { error: true };
    }
  }

  async checkIsBanner(senderId: string, channelId: string) {
    try {
      const bannedUser: BannedMember = await this.prisma.bannedMember.findFirst(
        {
          where: { userId: senderId, channelId: channelId },
        }
      );
      if (bannedUser) return true;
      return false;
    } catch (error) {
      return { error: true };
    }
  }

  async getValideChannels(senderId: string) {
    try {
      const publicChannels: Channel[] = await this.prisma.channel.findMany({
        where: { channelType: ChannelType.Public },
      });
      const result = await Promise.all(
        publicChannels
          .filter(async (channel: Channel) => {
            const test1 = await this.checkIsBanner(senderId, channel.id);
            return !test1;
          })
          .map(async (channel: Channel) => {
            let status: string = "user";
            const member: ChannelMember =
              await this.prisma.channelMember.findFirst({
                where: { userId: senderId, channelId: channel.id },
              });
            if (member) status = "member";
            const muted: MutedMember = await this.prisma.mutedMember.findFirst({
              where: { userId: senderId, channelId: channel.id },
            });
            if (muted) status = "muted";
            return {
              id: channel.id,
              channelName: channel.channelName,
              avatar: channel.avatar,
              protected: channel.protected,
              Status: status,
            };
          })
      );
      return result;
    } catch (error) {
      return { error: true };
    }
  }

  async joinChannel(senderId: string, channelId: string) {
    try {
      await this.prisma.channelMember.create({
        data: {
          userId: senderId,
          isAdmin: false,
          channelId: channelId,
        },
      });
      this.createMessageInfoChannel(senderId, channelId, "", "join Channel");
    } catch (error) {
      return { error: true };
    }
  }

  async muteUserFromChannel(
    senderId: string,
    channelId: string,
    userId: string,
    timer: string
  ) {
    try {
      const admin = await this.prisma.channelMember.findFirst({
        where: { userId: senderId, channelId: channelId },
      });
      if (admin && admin.isAdmin) {
        const user = await this.prisma.channelMember.findFirst({
          where: { userId: userId, channelId: channelId },
        });
        if (user) {
          const tm = parseInt(timer);
          const mute = await this.prisma.mutedMember.create({
            data: {
              userId,
              unmuted_at: new Date(new Date().getTime() + tm),
              channelId: channelId,
            },
          });
        }
      }
    } catch (error) {
      return { error: true };
    }
  }

  async cancelTimeOutByAdmin(
    senderId: string,
    channelId: string,
    userId: string
  ) {
    try {
      const admin = await this.prisma.channelMember.findFirst({
        where: {
          userId: senderId,
          channelId,
        },
      });
      if (admin && admin.isAdmin) {
        const muted: MutedMember = await this.prisma.mutedMember.findFirst({
          where: { userId, channelId },
        });
        if (muted) {
          await this.prisma.mutedMember.delete({ where: { id: muted.id } });
        }
      }
    } catch (error) {
      return { error: true };
    }
  }

  async cancelTimeOut(senderId: string, channelId: string) {
    const muted: MutedMember = await this.prisma.mutedMember.findFirst({
      where: {
        userId: senderId,
        channelId,
      },
    });
    if (muted) {
      const dt = new Date();
      if (muted.unmuted_at <= new Date()) {
        await this.prisma.mutedMember.delete({ where: { id: muted.id } });
        return 0;
      }
      return muted.unmuted_at.getTime() - dt.getTime();
    }
    return 0;
  }

  async checkIsMuted(senderId: string, channelId: string) {
    try {
      const muted: MutedMember = await this.prisma.mutedMember.findFirst({
        where: {
          userId: senderId,
          channelId,
        },
      });
      if (muted) {
        if (muted.unmuted_at < new Date()) {
          await this.prisma.mutedMember.delete({ where: { id: muted.id } });
          return -1;
        }
        const now = new Date();
        const result = muted.unmuted_at.getTime() - now.getTime();
        return result;
      }
      return -1;
    } catch (error) {
      return { error: true };
    }
  }
}
