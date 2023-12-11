import Cookies from "js-cookie";

export async function getDataOwner() {
  const token = Cookies.get("access_token");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK}/user/intra`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const owner = await res.json();
      return owner;
    }
  } catch (error) {}
}
