import axios from "axios";
import { Backend_URL } from "../../../../../lib/Constants";
import Cookies from "js-cookie";

export async function getDataOwner(intra_id: string) {
    const token = Cookies.get("access_token");
    try {
        const res = await fetch(Backend_URL + `/user/intra/${intra_id}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (res.ok) {
            const owner = await res.json();
            return (owner);
        }
    } catch (error) { }
}