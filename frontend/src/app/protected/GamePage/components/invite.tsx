
import { useRouter } from "next/navigation";
import React from "react";

import { useGlobalContext } from "@/app/context/store";

type InviteProps= {
    userId1: string;
    userId2: string;
}

const invite = ({userId1, userId2}: InviteProps) => {
    const { user, socket } = useGlobalContext();

    socket?.emit("invite", {userId1, userId2});
}



