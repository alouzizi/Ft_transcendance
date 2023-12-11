"use client";
import { useGlobalContext } from "@/app/protected/context/store";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { Text } from "@radix-ui/themes";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageUpload from "./components/imageupload";
import { getDataOwner } from "./IpaSettings/fetch-user";
import {
  generateUrlQr,
  turnOff_2FA,
  turnOn_2FA,
} from "./IpaSettings/fetch-qrcode";
import { z } from "zod";

export default function SettingsPage() {
  const { user, setUser } = useGlobalContext();

  const [checked, setChecked] = useState(false);
  const [urlImage, setUrlImage] = useState("");

  const [keyQrCode, setKeyQrCode] = useState("");

  const newNickNameSchema = z
    .string()
    .min(3)
    .max(15)
    .refine((name) => /^[a-zA-Z0-9_\-]+$/.test(name));
  const [newNickName, setNickName] = useState("");

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      user &&
      user.id !== "-1" &&
      !event.target.checked &&
      user.isTwoFactorAuthEnabled
    ) {
      await turnOff_2FA(user.intra_id);
      setChecked(false);
      toast.success("2fa authentication turned off successfully");
    } else if (event.target.checked) {
      setChecked(event.target.checked);
      const urlImg = await generateUrlQr();
      if (urlImg) setUrlImage(urlImg);
    } else if (!event.target.checked) {
      setUrlImage("");
      setChecked(event.target.checked);
    }
  };

  useEffect(() => {
    if (user.id != "-1" && user.isTwoFactorAuthEnabled) {
      setChecked(true);
    }
    setNickName(user.nickname);
  }, [user.id]);

  return (
    <div className="h-fit min-h-screen">
      <div className="pt-5 pl-20  text-white text-2xl/[29px] mb-5 mt-5">
        <Text weight="bold">Edit Profile</Text>
      </div>

      <div className="flex flex-col items-center ">
        <Text
          weight="bold"
          className="text-gray-400 text-xl w-[30rem] md:w-[10rem]"
        >
          Cover Image
        </Text>
        <div className="mt-2 mb-4">
          <img
            className="rounded-2xl h-[10rem] md:w-[30rem] w-[10rem]"
            src="/bg-info.png"
          ></img>
        </div>

        <Text
          weight="bold"
          className="text-gray-400 text-xl md:w-[30rem] w-[10rem]"
        >
          Profile Image
        </Text>
        <div className="md:w-[30rem] w-[10rem] mt-4">
          <ImageUpload />
        </div>
        <div className="md:w-[30rem] w-[10rem] mt-5">
          <div className="flex bg-[#F6F7FA] mt-0  border rounded-[10px]  md:w-[20rem] w-[10rem]">
            <input
              type="text"
              className="bg-[#F6F7FA]  p-1.5 flex md:w-[15rem] w-[7rem] 
                        text-black placeholder-gray-400 text-sm outline-none rounded-[5px] mr-1"
              value={newNickName}
              placeholder="nickname"
              onChange={(e) => {
                setNickName(e.target.value.trim());
              }}
            ></input>
          </div>

          <div className="md:w-[30rem] w-[10rem] mt-3">
            <div className="flex items-center justify-start ">
              <Switch checked={checked} color="info" onChange={handleChange} />
              <label className="text-white text-sm md:text-lg">
                Two-factor Authentification
              </label>
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
                    try {
                      if (keyQrCode !== "") {
                        const data = await turnOn_2FA(user.intra_id, keyQrCode);
                        if (data) {
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
                    } catch (e) {}
                  }}
                >
                  Active 2FA
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-end justify-end md:w-[30rem] w-[10rem]">
            <button
              onClick={async (e) => {
                e.preventDefault();
                if (newNickName !== user.nickname) {
                  const validationResult =
                    newNickNameSchema.safeParse(newNickName);
                  //console.log("newNickName=", newNickName);
                  //console.log("validationResult=", validationResult);
                  if (!validationResult.success) {
                    toast.error("nickname error");
                  } else {
                    try {
                      const token = Cookies.get("access_token");
                      const response = await fetch(
                        `${process.env.NEXT_PUBLIC_BACK}/user/updateNickname/${
                          user.intra_id
                        }/${newNickName.toLowerCase()}`,
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
                        const tmp = await getDataOwner();
                        setUser(tmp);
                      }
                    } catch (error) {}
                  }
                }
              }}
              className="bg-[#4069FF] px-7 py-1 rounded-2xl  flex items-center mb-5 mt-3"
            >
              <div className="text-white  pr-2">Save</div>
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
