"use client";

import { Socket } from "socket.io-client";
import { useGlobalContext } from "../../context/store";


type InviteProps = {
  userId1: string;
  userId2: string;
  socket: Socket | null;
};


const PlayInvite = ({userId1, userId2, socket}: InviteProps) => {
    socket?.emit("invite", {userId1, userId2});
return (
    <div></div>
);
    
}

export default PlayInvite;