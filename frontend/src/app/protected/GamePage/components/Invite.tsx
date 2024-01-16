"use client";

import { Socket } from "socket.io-client";
import { useGlobalContext } from "../../context/store";


type InviteProps = {
  userId1: string;
  userId2: string;
  socket: Socket | null;
  nameInveted: string;
};


const PlayInvite = ({ userId1, userId2, socket, nameInveted }: InviteProps) => {
  socket?.emit("invite", { userId1, userId2, nameInveted });
  return (
    <div></div>
  );

}

export default PlayInvite;