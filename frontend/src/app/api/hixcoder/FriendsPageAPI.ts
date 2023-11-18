import { Backend_URL } from "../../../../lib/Constants";
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

export async function getNavSearchUsers(userId: string) {
  try {
    const response = await fetch(
      `${Backend_URL}/hixcoder/navSearchUsers/${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("getNavSearchUsers error: " + error);
    return null;
  }
}

export async function getOneUser(recieverId: string) {
  try {
    console.log(`${Backend_URL}/hixcoder/oneUser/${recieverId}`);
    const response = await fetch(
      `${Backend_URL}/hixcoder/oneUser/${recieverId}`,
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

export async function getIsBlocked(senderId: string, recieverId: string) {
  try {
    const response = await fetch(
      `${Backend_URL}/hixcoder/isBlocked/${senderId}/${recieverId}`,
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

// ==========================    ****    ==========================
// ==========================    ****    ==========================
// ==========================    ****    ==========================
// ==========================    ****    ==========================
// ==========================    ****    ==========================
// ==========================    ****    ==========================
// ==========================    ****    ==========================
// ==========================  Game Gets ==========================

export async function getGameHistory(senderUsr: string) {
  const def: gameHistoryDto[] = [];
  try {
    if (!senderUsr) {
      return def;
    }
    const response = await fetch(
      `${Backend_URL}/hixcoder/gameHistory/${senderUsr}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      const data: gameHistoryDto[] = await response.json();
      return data;
    }
    return def;
  } catch (error: any) {
    console.log("getGameHistory error: " + error);
    return def;
  }
}

export async function getLeaderBoard() {
  const def: LeaderBoard[] = [];
  try {
    const response = await fetch(`${Backend_URL}/hixcoder/LeaderBoard/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const data: LeaderBoard[] = await response.json();
      return data;
    }
    return def;
  } catch (error: any) {
    console.log("getLeaderBoard error: " + error);
    return def;
  }
}

export async function getGlobalInfos(senderUsr: string) {
  const def = {
    NbrOfAllMatches: 0,
    NbrOfWinnedMatches: 0,
    NbrOfLosedMatches: 0,
    NbrOfFriends: 0,
    NbrOfBlockedFriends: 0,
    NbrOfInvitedFriends: 0,
  };
  try {
    if (senderUsr === "") {
      return def;
    }
    const response = await fetch(
      `${Backend_URL}/hixcoder/globalInfos/${senderUsr}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("getGlobalInfos error: " + error);
    return def;
  }
}

export function getAchievmentsData(globalInfo: globalInfoDto) {
  let achievementsList = [
    {
      isUnlocked: globalInfo.NbrOfAllMatches > 0,
      image: "/achiev1.png",
      title: "First game",
      mission: "play your first match",
      type: "Bronz",
    },
    {
      isUnlocked: globalInfo.NbrOfFriends > 0,
      image: "/achiev1.png",
      title: "First friend",
      mission: "have at least one friend",
      type: "Bronz",
    },
    {
      isUnlocked: globalInfo.NbrOfWinnedMatches > 0,
      image: "/achiev1.png",
      title: "small Winner",
      mission: "win at least one match",
      type: "Bronz",
    },
    {
      isUnlocked: globalInfo.NbrOfBlockedFriends > 0,
      image: "/achiev1.png",
      title: "Hater",
      mission: "Block a user",
      type: "Bronz",
    },
    {
      isUnlocked: globalInfo.NbrOfLosedMatches >= 5,
      image: "/achiev1.png",
      title: "Loser",
      mission: "Lose 5 games",
      type: "Bronz",
    },
    {
      isUnlocked: globalInfo.NbrOfLosedMatches >= 10,
      image: "/achiev1.png",
      title: "Big Loser",
      mission: "Lose 10 games",
      type: "Bronz",
    },

    // Selver
    {
      isUnlocked: globalInfo.NbrOfWinnedMatches >= 5,
      image: "/achiev1.png",
      title: "Winner",
      mission: "Win 5 games",
      type: "Selver",
    },
    {
      isUnlocked: globalInfo.NbrOfWinnedMatches >= 20,
      image: "/achiev1.png",
      title: "Big Winner",
      mission: "Win 20 games",
      type: "Selver",
    },
    {
      isUnlocked: globalInfo.NbrOfFriends >= 10,
      image: "/achiev1.png",
      title: "Social-Man",
      mission: "make 10 friends",
      type: "Selver",
    },
    {
      isUnlocked: globalInfo.NbrOfInvitedFriends >= 10,
      image: "/achiev1.png",
      title: "Look At me",
      mission: "invite 10 users ",
      type: "Selver",
    },

    // Gold
    {
      isUnlocked: globalInfo.NbrOfWinnedMatches >= 50,
      image: "/achiev1.png",
      title: "Goat",
      mission: "Win 50 games",
      type: "Gold",
    },
    {
      isUnlocked: globalInfo.NbrOfAllMatches >= 100,
      image: "/achiev1.png",
      title: "I think I can",
      mission: "Play 100 match",
      type: "Gold",
    },
    {
      isUnlocked: globalInfo.NbrOfFriends >= 50,
      image: "/achiev1.png",
      title: "Famous-Man",
      mission: "Make 50 friends",
      type: "Gold",
    },
    {
      isUnlocked: globalInfo.NbrOfInvitedFriends >= 100,
      image: "/achiev1.png",
      title: "Networker",
      mission: "Invite 100 users",
      type: "Gold",
    },
  ];
  return achievementsList;
}

export async function getUserRanking(senderUsr: string) {
  const def = {
    userName: "",
    rank: 0,
  };
  try {
    if (!senderUsr) {
      return def;
    }
    const response = await fetch(
      `${Backend_URL}/hixcoder/userRanking/${senderUsr}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log("getUserRanking error: " + error);
    return def;
  }
}

// ==========================  Game Posts =========================

export async function updateLevel(senderId: string, newLevel: string) {
  try {
    const response = await fetch(
      `${Backend_URL}/hixcoder/updateLevel/${senderId}/${newLevel}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log("updateLevel error: " + error);
    return null;
  }
}

// - in the first 10 levels after wining a game you win 100px
// - between 10 and 20 you win 200px
// - and > 20 you win 300px

// - first level need 200px and each level heigher need another 100px
