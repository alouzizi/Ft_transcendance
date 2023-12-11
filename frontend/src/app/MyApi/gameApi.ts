import Cookies from "js-cookie";

// ================================================================
// ================================================================
// ==========================  Game Gets ==========================
// ================================================================
// ================================================================

export async function getGameHistory(senderId: string) {
  let res: gameHistoryDto[] = [];
  try {
    if (!senderId) {
      return res;
    }
    const token = Cookies.get("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK}/game/gameHistory/${senderId}`,
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
    //console.log("getGameHistory error: " + error);
    return res;
  }
}

export async function getLeaderBoard() {
  let res: LeaderBoard[] = [];
  try {
    const token = Cookies.get("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK}/game/LeaderBoard/`,
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
    //console.log("getLeaderBoard error: " + error);
    return res;
  }
}

export async function getGlobalInfos(senderId: string) {
  let res: globalInfo = {
    NbrOfAllMatches: 0,
    NbrOfWinnedMatches: 0,
    NbrOfLosedMatches: 0,
    NbrOfFriends: 0,
    NbrOfBlockedFriends: 0,
    NbrOfInvitedFriends: 0,
  };

  try {
    if (!senderId) {
      return res;
    }
    const token = Cookies.get("access_token");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK}/game/globalInfos/${senderId}`,
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
    //console.log("getGlobalInfos error: " + error);
    return res;
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

export async function getUserRanking(senderId: string) {
  let res: userRank = {
    userId: "",
    rank: 0,
  };
  try {
    if (!senderId) {
      return res;
    }
    const token = Cookies.get("access_token");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACK}/game/userRanking/${senderId}`,
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
    //console.log("getUserRanking error: " + error);
    return res;
  }
}
