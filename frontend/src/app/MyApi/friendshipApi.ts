import Cookies from "js-cookie";

// ================================================================
// ================================================================
// ==========================     Gets   ==========================
// ================================================================
// ================================================================

export async function getNavSearchUsers(userId: string) {
  let res: friendDto[] = [];
  try {
    if (!userId) {
      return res;
    }
    const token = Cookies.get("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK}/friendship/navSearchUsers/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      res = await response.json();
    }
    return res;
  } catch (error: any) {
    //console.log("getNavSearchUsers error: " + error);
    return res;
  }
}
enum Status {
  ACTIF = "ACTIF",
  INACTIF = "INACTIF",
}
export async function getUserByNick(recieverUsr: string) {
  let res: ownerDto = {
    id: "-1",
    intra_id: "",
    first_name: "",
    last_name: "",
    nickname: "",
    profilePic: "",
    isTwoFactorAuthEnabled: true,
    level: "0.0",
    inGaming: false,
    status: Status.INACTIF,
  };
  try {
    if (!recieverUsr) {
      return res;
    }
    const token = Cookies.get("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK}/friendship/getUserByNick/${recieverUsr}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      res = await response.json();
    }
    return res;
  } catch (error: any) {
    //console.log("getUserByNick error: " + error);
    return res;
  }
}

export async function getIsBlocked(senderId: string, recieverId: string) {
  let res = {
    isBlocked: false,
  };
  try {
    if (!senderId || !recieverId) {
      return res;
    }
    const token = Cookies.get("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK}/friendship/isBlocked/${senderId}/${recieverId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      res = await response.json();
    }
    return res;
  } catch (error: any) {
    //console.log("getIsBlocked error: " + error);
    return res;
  }
}

export async function getOnlineFriends(userId: string) {
  let res: friendDto[] = [];
  try {
    if (!userId) {
      return res;
    }
    const token = Cookies.get("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK}/friendship/onlineFriends/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      res = await response.json();
    }

    return res;
  } catch (error: any) {
    //console.log("getOnlineFriends error: " + error);
    return res;
  }
}

export async function getAllFriends(userId: string) {
  let res: friendDto[] = [];
  try {
    if (!userId) {
      return res;
    }
    const token = Cookies.get("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK}/friendship/allFriends/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      res = await response.json();
    }
    return res;
  } catch (error: any) {
    //console.log("getAllFriends error: " + error);
    return res;
  }
}

export async function getPendingFriends(userId: string) {
  let res: friendDto[] = [];
  try {
    if (!userId) {
      return res;
    }
    const token = Cookies.get("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK}/friendship/pendingFriends/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      res = await response.json();
    }
    return res;
  } catch (error: any) {
    //console.log("getPendingFriends error: " + error);
    return res;
  }
}

export async function getBlockedFriends(userId: string) {
  let res: friendDto[] = [];
  try {
    if (!userId) {
      return res;
    }
    const token = Cookies.get("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK}/friendship/blockedFriends/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      res = await response.json();
    }
    return res;
  } catch (error: any) {
    //console.log("getBlockedFriends error: " + error);
    return res;
  }
}

export async function getAllPossibleFriends(userId: string) {
  let res: friendDto[] = [];
  try {
    if (!userId) {
      return res;
    }
    const token = Cookies.get("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK}/friendship/allPossibleFriends/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      res = await response.json();
    }
    return res;
  } catch (error: any) {
    //console.log("getAllPossibleFriends error: " + error);
    return res;
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
    if (!senderId || !recieverId) {
      return;
    }
    const token = Cookies.get("access_token");
    await fetch(
      `${process.env.NEXT_PUBLIC_BACK}/friendship/removeFriend/${senderId}/${recieverId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: any) {
    //console.log("removeFriend error: " + error);
  }
}

export async function blockFriend(senderId: string, recieverId: string) {
  try {
    if (!senderId || !recieverId) {
      return;
    }
    const token = Cookies.get("access_token");
    await fetch(
      `${process.env.NEXT_PUBLIC_BACK}/friendship/blockFriend/${senderId}/${recieverId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: any) {
    //console.log("blockFriend error: " + error);
  }
}

export async function unblockFriend(senderId: string, recieverId: string) {
  try {
    if (!senderId || !recieverId) {
      return;
    }
    const token = Cookies.get("access_token");
    await fetch(
      `${process.env.NEXT_PUBLIC_BACK}/friendship/unblockFriend/${senderId}/${recieverId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: any) {
    //console.log("unblockFriend error: " + error);
  }
}

export async function sendFriendRequest(senderId: string, recieverId: string) {
  try {
    if (!senderId || !recieverId) {
      return;
    }
    const token = Cookies.get("access_token");
    await fetch(
      `${process.env.NEXT_PUBLIC_BACK}/friendship/sendFriendRequest/${senderId}/${recieverId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: any) {
    //console.log("sendFriendRequest error: " + error);
  }
}

export async function unsendFriendRequest(
  senderId: string,
  recieverId: string
) {
  try {
    if (!senderId || !recieverId) {
      return;
    }
    const token = Cookies.get("access_token");
    await fetch(
      `${process.env.NEXT_PUBLIC_BACK}/friendship/unsendFriendRequest/${senderId}/${recieverId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: any) {
    //console.log("unsendFriendRequest error: " + error);
    return null;
  }
}

export async function rejectFriendRequest(
  senderId: string,
  recieverId: string
) {
  try {
    if (!senderId || !recieverId) {
      return;
    }
    const token = Cookies.get("access_token");
    await fetch(
      `${process.env.NEXT_PUBLIC_BACK}/friendship/rejectFriendRequest/${senderId}/${recieverId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: any) {
    //console.log("rejectFriendRequest error: " + error);
  }
}

export async function acceptFriendRequest(
  senderId: string,
  recieverId: string
) {
  try {
    if (!senderId || !recieverId) {
      return;
    }
    const token = Cookies.get("access_token");
    await fetch(
      `${process.env.NEXT_PUBLIC_BACK}/friendship/acceptFriendRequest/${senderId}/${recieverId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error: any) {
    //console.log("acceptFriendRequest error: " + error);
  }
}
