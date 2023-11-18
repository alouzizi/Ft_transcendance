"use client";
import { useGlobalContext } from "@/app/protected/context/store";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUpload from "./imageupload";
import { Text } from "@radix-ui/themes";
import { FaCheckCircle } from "react-icons/fa";
import { Backend_URL } from "../../../../lib/Constants";

export default function SettingsPage() {
  const token = Cookies.get("access_token");
  const router = useRouter();

  const { user } = useGlobalContext();

  const [checked, setChecked] = useState(false);
  const [urlImage, setUrlImage] = useState("");
  const [newNickName, setNickName] = useState("");
  const [keyQrCode, setKeyQrCode] = useState("");

  const getUrlQr = async () => {
    const token = Cookies.get("access_token");
    const res = await axios.get(Backend_URL + `/auth/2fa/generate`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const qrcode = await res.data;
    if (qrcode) setUrlImage(qrcode);
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (user && event.target.checked == false && user.id !== "-1" && checked) {
      const res = await fetch(
        `${Backend_URL}/auth/2fa/turn-off/${user.intra_id}`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setChecked(false);
      toast.success("2fa authentication turned off successfully");
    } else if (event.target.checked == true) {
      getUrlQr();
    }
  };

  useEffect(() => {
    if (user.id != "-1" && user.isTwoFactorAuthEnabled) {
      setChecked(true);
    }

    setNickName(user.nickname);
  }, [user.id]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div>
        <Text className="text-gray-600 text-xl">Cover Image</Text>
        <div className="mt-1 mb-4">
          <img
            className="rounded-2xl h-[10rem] w-[30rem]"
            src="/bg-info.png"
          ></img>
        </div>
        <Text className="text-gray-600 text-xl ">Profile Image</Text>
        <ImageUpload />

        <div className="flex flex-col justify-center items-center gap-6 w-[30rem] mt-4">
          <div className="flex bg-[#F6F7FA] mt-0  border rounded-[10px]  w-[10rem] md:w-[15rem]">
            <input
              type="text"
              className="bg-[#F6F7FA]  p-1.5 flex w-[20rem]  
                        text-black placeholder-gray-600 text-sm outline-none rounded-[5px] mr-1"
              value={newNickName}
              placeholder="nickname"
              onChange={(e) => {
                setNickName(e.target.value);
              }}
            ></input>
            {newNickName !== user.nickname && newNickName !== "" ? (
              <div
                className="cursor-pointer flex items-center pr-2"
                onClick={async () => {
                  if (newNickName.length > 20 || newNickName.length < 3) {
                    toast.error("nickname error");
                  } else {
                    try {
                      const response = await fetch(
                        Backend_URL +
                          `/user/updatUserdata/${user.intra_id}/${newNickName}/tmp`,
                        {
                          method: "POST",
                          headers: {
                            authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                          },
                        }
                      );
                      if (response.status === 409)
                        toast.error("nickname aleady exist");
                      else if (response.status === 201) {
                        toast.success("nickname has been change");
                      }
                    } catch (error) {}
                  }
                }}
              >
                <FaCheckCircle size={18} color="black" />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col items-center justify-center mt-2">
            <div className="flex items-center justify-start ">
              <Switch checked={checked} color="info" onChange={handleChange} />
              <label className="text-white">Two-factor Authentification</label>
            </div>

            {urlImage === "" ? (
              <></>
            ) : (
              <Image
                width={200}
                height={200}
                src={urlImage}
                alt="Preview"
                className="w-40 h-40"
              />
            )}
            {urlImage === "" ? (
              <></>
            ) : (
              <div className="flex my-3">
                <input
                  type="text"
                  className="bg-[#F6F7FA]  p-1.5 flex w-[10rem]  
                        text-black placeholder-gray-600 text-sm outline-none rounded-[5px] mr-1"
                  value={keyQrCode}
                  placeholder="code 6 digit"
                  onChange={(e) => {
                    setKeyQrCode(e.target.value);
                  }}
                ></input>

                <Button
                  variant="contained"
                  className="ml-2 bg-[#4069FF]"
                  onClick={async () => {
                    if (keyQrCode !== "") {
                      const response = await fetch(
                        Backend_URL +
                          `/auth/2fa/turn-on/${user.intra_id}/${keyQrCode}`,
                        {
                          method: "POST",
                          headers: {
                            authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                          },
                        }
                      );
                      if (response.ok) {
                        setChecked(true);
                        setUrlImage("");
                        toast.success(
                          "2fa authentication turned on successfully"
                        );
                      } else {
                        toast.error("Wrong authentication code");
                      }
                    } else {
                      toast.error("Wrong authentication code");
                    }
                  }}
                >
                  Active 2FA
                </Button>
              </div>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
