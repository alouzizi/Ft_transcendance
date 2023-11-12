<<<<<<< HEAD
import { Backend_URL } from "@/lib/Constants";
=======
import { useGlobalContext } from "@/app/context/store";
import { Backend_URL } from "../../../../lib/Constants";
>>>>>>> implement the sockets successfully
import axios from "axios";

// ============================ GETS ============================

export async function getAllUsers(userId: string) {
  try {
    const response = await fetch(`${Backend_URL}/hixcoder/allUsers/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("getAllUsers error: " + error);
    return null;
  }
}

export async function getOneUser(username: string) {
  try {
    console.log(`${Backend_URL}/hixcoder/oneUser/${username}`);
    const response = await fetch(
      `${Backend_URL}/hixcoder/oneUser/${username}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("getOneUser error: " + error);
    return null;
  }
}

export async function getOnlineFriends(userId: string) {
  try {
    const response = await fetch(
      `${Backend_URL}/hixcoder/onlineFriends/${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log("getOnlineFriends error: " + error);
    return null;
  }
}

export async function getAllFriends(userId: string) {
  try {
    const response = await fetch(
      `${Backend_URL}/hixcoder/allFriends/${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log("getAllFriends error: " + error);
    return null;
  }
}

export async function getPendingFriends(userId: string) {
  try {
    const response = await fetch(
      `${Backend_URL}/hixcoder/pendingFriends/${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log("getPendingFriends error: " + error);
    return null;
  }
}

export async function getBlockedFriends(userId: string) {
  try {
    const response = await fetch(
      `${Backend_URL}/hixcoder/blockedFriends/${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log("getBlockedFriends error: " + error);
    return null;
  }
}

export async function getAllPossibleFriends(userId: string) {
  try {
    const response = await fetch(
      `${Backend_URL}/hixcoder/allPossibleFriends/${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("getAllPossibleFriends error: " + error);
    return null;
  }
}

// ============================ POSTS ============================

export async function removeFriend(senderId: string, recieverId: string) {
  try {
    const response = await fetch(
      `${Backend_URL}/hixcoder/removeFriend/${senderId}/${recieverId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log("removeFriend error: " + error);
    return null;
  }
}

export async function blockFriend(senderId: string, recieverId: string) {
  try {
    const response = await fetch(
      `${Backend_URL}/hixcoder/blockFriend/${senderId}/${recieverId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log("blockFriend error: " + error);
    return null;
  }
}

export async function unblockFriend(senderId: string, recieverId: string) {
  try {
    const response = await fetch(
      `${Backend_URL}/hixcoder/unblockFriend/${senderId}/${recieverId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log("unblockFriend error: " + error);
    return null;
  }
}

export async function sendFriendRequest(senderId: string, recieverId: string) {
  try {
    const response = await fetch(
      `${Backend_URL}/hixcoder/sendFriendRequest/${senderId}/${recieverId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log("sendFriendRequest error: " + error);
    return null;
  }
}

export async function unsendFriendRequest(
  senderId: string,
  recieverId: string
) {
  try {
    const response = await fetch(
      `${Backend_URL}/hixcoder/unsendFriendRequest/${senderId}/${recieverId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log("unsendFriendRequest error: " + error);
    return null;
  }
}

export async function rejectFriendRequest(
  senderId: string,
  recieverId: string
) {
  try {
    const response = await fetch(
      `${Backend_URL}/hixcoder/rejectFriendRequest/${senderId}/${recieverId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log("rejectFriendRequest error: " + error);
    return null;
  }
}

export async function acceptFriendRequest(
  senderId: string,
  recieverId: string
) {
  try {
    const response = await fetch(
      `${Backend_URL}/hixcoder/acceptFriendRequest/${senderId}/${recieverId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log("acceptFriendRequest error: " + error);
    return null;
  }
}
