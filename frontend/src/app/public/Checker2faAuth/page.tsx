"use client";
import { Button } from "@mui/material";
import { cache, useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Backend_URL } from "../../../../lib/Constants";
import { auth_2fa } from "./api_check/fetch-2fa";

export default function login() {

  const router = useRouter();
  const [keyQrCode, setKeyQrCode] = useState("");

  return (
    <div className="flex justify-center items-center">
      <div className="flex my-3 ">
        <input
          type="text"
          className="bg-[#F6F7FA]  p-1.5 flex w-[10rem]  border
                        text-black placeholder-gray-600 text-sm outline-none rounded-[5px] mr-1"
          value={keyQrCode}
          placeholder="code 6 digit"
          onChange={(e) => {
            setKeyQrCode(e.target.value);
          }}
        ></input>

        <Button
          variant="contained"
          className="ml-2 bg-blue-600"
          onClick={async () => {
            if (keyQrCode !== "") {
              const intra_id: string = Cookies.get("intra_id") || "";
              const data = await auth_2fa(intra_id, keyQrCode);
              if (data.isCodeValid) {
                Cookies.set("access_token", data.access_token);
                router.push("/protected/DashboardPage");
              } else toast.error("Wrong authentication codee");
            } else toast.error("Wrong authentication codee");
          }}
        >
          Active 2FA
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}
