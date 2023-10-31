import { Backend_URL } from "@/lib/Constants";
import axios from "axios";

// get online friends

export async function getOnlineFriends(userId: number) {
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

export async function getAllFriends(userId: number) {
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

export async function getPendingFriends(userId: number) {
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

export async function getBlockedFriends(userId: number) {
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
