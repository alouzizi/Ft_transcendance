import { Backend_URL } from "../../../lib/Constants";

// ============================ GETS ============================
// ============================ GETS ============================
// ============================ GETS ============================
// ============================ GETS ============================
// ============================ GETS ============================
// ============================ GETS ============================

export async function getAllUsers(userId: string) {
  try {
    const response = await fetch(
      `${Backend_URL}/friendship/allUsers/${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("getAllUsers error: " + error);
    return null;
  }
}

export async function getNavSearchUsers(userId: string) {
  const def: friendDto[] = [];
  try {
    const response = await fetch(
      `${Backend_URL}/friendship/navSearchUsers/${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("getNavSearchUsers error: " + error);
    return def;
  }
}

export async function getUserByNick(recieverUsr: string) {
  try {
    console.log(`${Backend_URL}/friendship/getUserByNick/${recieverUsr}`);
    const response = await fetch(
      `${Backend_URL}/friendship/getUserByNick/${recieverUsr}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("getUserByNick error: " + error);
    return null;
  }
}

export async function getIsBlocked(senderId: string, recieverId: string) {
  try {
    const response = await fetch(
      `${Backend_URL}/friendship/isBlocked/${senderId}/${recieverId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log("getIsBlocked error: " + error);
    return null;
  }
}

export async function getOnlineFriends(userId: string) {
  try {
    const response = await fetch(
      `${Backend_URL}/friendship/onlineFriends/${userId}`,
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
      `${Backend_URL}/friendship/allFriends/${userId}`,
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
      `${Backend_URL}/friendship/pendingFriends/${userId}`,
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
      `${Backend_URL}/friendship/blockedFriends/${userId}`,
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
      `${Backend_URL}/friendship/allPossibleFriends/${userId}`,
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
// ============================ POSTS ============================
// ============================ POSTS ============================
// ============================ POSTS ============================
// ============================ POSTS ============================
// ============================ POSTS ============================
// ============================ POSTS ============================

export async function removeFriend(senderId: string, recieverId: string) {
  try {
    const response = await fetch(
      `${Backend_URL}/friendship/removeFriend/${senderId}/${recieverId}`,
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
      `${Backend_URL}/friendship/blockFriend/${senderId}/${recieverId}`,
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
      `${Backend_URL}/friendship/unblockFriend/${senderId}/${recieverId}`,
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
      `${Backend_URL}/friendship/sendFriendRequest/${senderId}/${recieverId}`,
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
      `${Backend_URL}/friendship/unsendFriendRequest/${senderId}/${recieverId}`,
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
      `${Backend_URL}/friendship/rejectFriendRequest/${senderId}/${recieverId}`,
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
      `${Backend_URL}/friendship/acceptFriendRequest/${senderId}/${recieverId}`,
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
