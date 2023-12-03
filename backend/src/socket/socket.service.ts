import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Server, Socket } from "socket.io";
import { MessageStatus, Status } from "@prisma/client";
import { CreateMessageDto } from "src/messages/dto/create-message.dto";

@Injectable()
export class SocketGatewayService {
  constructor(private prisma: PrismaService) { }

  async handleConnection(client: Socket, wss: Server) {
    try {
      if (typeof client.handshake.query.senderId === "string") {
        client.join(client.handshake.query.senderId);
        const senderId = client.handshake.query.senderId;
        const userExists = await this.prisma.user.findUnique({
          where: {
            id: senderId,
          },
        });
        if (userExists) {
          try {
            await this.prisma.user.update({
              where: { id: senderId },
              data: {
                status: Status.ACTIF,
              },
            });

            await this.prisma.message.updateMany({
              where: {
                receivedId: senderId,
                messageStatus: MessageStatus.NotReceived,
              },
              data: {
                messageStatus: MessageStatus.Received,
              },
            });

            const activeUsers = await this.prisma.user.findMany({
              where: {
                status: Status.ACTIF,
              },
            });
            for (const user of activeUsers) {
              // wss.to(user.id).emit("updateStatusGeust", {});
              if (user.id !== client.handshake.query.senderId) {
                wss.to(user.id).emit("updateStatusGeust", {});
              }
            }
          } catch (error) {
            console.error("Error while handling connection:", error);
          }
        }
      }
    } catch (error) { }
  }

  async handleDisconnect(client: Socket, wss: Server) {
    try {
      if (typeof client.handshake.query.senderId === "string") {
        await this.prisma.user.update({
          where: {
            id: client.handshake.query.senderId,
          },
          data: {
            status: Status.INACTIF,
            lastSee: new Date(),
          },
        });
        const users = await this.prisma.user.findMany();
        for (const user of users) {
          if (user.id !== client.handshake.query.senderId) {
            wss.to(user.id).emit("updateStatusGeust", {});
          }
        }
      }
    } catch (error) { }
  }

  async updateData(ids: CreateMessageDto, wss: Server) {
    wss.to(ids.senderId).emit("updateData", {});
    if (ids.isDirectMessage === false) {
      const channelMembers = await this.prisma.channelMember.findMany({
        where: { channelId: ids.receivedId },
      });
      for (const member of channelMembers) {
        wss.to(member.userId).emit("updateData", {});
      }
    } else wss.to(ids.receivedId).emit("updateData", {});
  }

  async emitNewMessage(ids: CreateMessageDto, wss: Server) {
    // wss.to(ids.senderId).emit("emitNewMessage", {});
    if (ids.isDirectMessage === false) {
      const channelMembers = await this.prisma.channelMember.findMany({
        where: { channelId: ids.receivedId },
      });
      for (const member of channelMembers) {
        wss.to(member.userId).emit("emitNewMessage", {});
      }
    } else wss.to(ids.receivedId).emit("emitNewMessage", {});
  }

  async updateChannel(ids: CreateMessageDto, wss: Server) {
    const channelMembers = await this.prisma.channelMember.findMany({
      where: { channelId: ids.receivedId },
    });
    for (const member of channelMembers) {
      wss.to(member.userId).emit("updateChannel", { idChannel: ids.receivedId });
    }
  }

  async updateMessageInChannel(ids: CreateMessageDto, wss: Server) {
    const channelMembers = await this.prisma.channelMember.findMany({
      where: { channelId: ids.receivedId },
    });
    for (const member of channelMembers) {
      wss.to(member.userId).emit("updateMessageInChannel", { idChannel: ids.receivedId });
    }
  }


  async mutedUserInChannel(idChannel: string, wss: Server) {
    const channelMembers = await this.prisma.channelMember.findMany({
      where: { channelId: idChannel },
    });
    for (const member of channelMembers) {
      wss.to(member.userId).emit("mutedUserInChannel", { idChannel: idChannel });
    }
  }

  async changeStatusMember(idChannel: string, wss: Server) {

    const channelMembers = await this.prisma.channelMember.findMany({
      where: { channelId: idChannel },
    });
    for (const member of channelMembers) {
      wss.to(member.userId).emit("changeStatusMember", { channelId: idChannel });
    }
  }

  async kickedFromChannel(ids: any, wss: Server) {
    const channelMembers = await this.prisma.channelMember.findMany({
      where: { channelId: ids.channelId },
    });
    for (const member of channelMembers) {
      wss.to(member.userId).emit("kickedFromChannel", ids);
    }
    wss.to(ids.memberId).emit("kickedFromChannel", ids);
  }

  async messagsSeenEmit(ids: CreateMessageDto, wss: Server) {
    await this.prisma.message.updateMany({
      where: {
        senderId: ids.receivedId,
        receivedId: ids.senderId,
      },
      data: {
        messageStatus: MessageStatus.Seen,
      },
    });
    console.log("-->", ids.receivedId);
    wss.to(ids.receivedId).emit("messagsSeenEmit");
  }
}
