"use client";
import { useGlobalContext } from "@/app/protected/context/store";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Avatar, Text } from "@radix-ui/themes";
import * as React from "react";
import { useEffect, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { z } from "zod";
import {
  checkOwnerIsAdmin,
  getChannel,
  updateChannel,
} from "../../api/fetch-channel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { getVueGeust } from "../../api/fetch-users";

enum ChannelType {
  Public = "Public",
  Private = "Private",
}

export default function UpdateChannel() {
  const { user, geust, setGeust, socket } = useGlobalContext();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const channelNameSchema = z
    .string()
    .min(3)
    .max(15)
    .refine((name) => /^[a-zA-Z0-9_-]+$/.test(name));
  const channelkeySchema = z
    .string()
    .min(3)
    .max(12)
    .refine((name) => /^[a-zA-Z0-9_\-@#*!.]+$/.test(name));
  const [errorName, setErrorName] = useState("");
  const [errorKey, setErrorKey] = useState("");

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [channelData, setChannelData] = useState<channelDto>({
    channelName: "",
    channelType: ChannelType.Public,
    channelPassword: "",
    channelOwnerId: "",
    avatar: "",
    protected: false,
    channelMember: [],
  });

  const [channel, setChannel] = useState<channelDto>(channelData);

  useEffect(() => {
    const getData = async (data: { idChannel: string }) => {
      if (geust.id === data.idChannel) {
        const tmp: channelDto = await getChannel(user.id, geust.id);
        setChannel(tmp);
        setChannelData(tmp);
      }
    };
    if (geust.id !== "-1" && !geust.isUser) getData({ idChannel: geust.id });
    if (socket) {
      socket.on("updateChannel", getData);
      return () => {
        socket.off("updateChannel", getData);
      };
    }
  }, [socket, geust.id]);

  const [isOwnerAdmin, setIsOwnerAdmin] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const tmp: boolean = await checkOwnerIsAdmin(user.id, geust.id);
      setIsOwnerAdmin(tmp);
    };
    if (geust.id !== "-1" && user.id !== "-1" && !geust.isUser) getData();
  }, []);

  const isSameChannel = (
    channel1: channelDto,
    channel2: channelDto
  ): boolean => {
    return (
      channel1.channelName === channel2.channelName &&
      channel1.channelType === channel2.channelType &&
      channel1.protected === channel2.protected &&
      channel1.channelPassword === channel2.channelPassword &&
      channel1.avatar === channel2.avatar
    );
  };

  const updateChannelServer = async () => {
    const res = await updateChannel(channelData, user.id, geust.id);
    if (res && res.status === 202) {
      setErrorName(res.error);
    } else if (res && res.status === 200) {
      setChannel(res.channel);
      setChannelData(res.channel);
      socket?.emit("updateChannel", {
        content: "",
        senderId: user.id,
        receivedId: geust.id,
      });
      toast.success("Channel has been updated");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="flex items-center justify-center pt-4 pb-2
                    flex-col
                    md:flex-row
                     "
      >
        <label className="border-[2px] border-[#1f3175] hover:border-white rounded-full p-[1.5px]">
          <Avatar
            size="6"
            src={selectedImage || channelData.avatar}
            radius="full"
            fallback="T"
          />
          <input
            type="file"
            accept="image/*"
            disabled={!(isOwnerAdmin || !channel.protected)}
            style={{ display: "none" }}
            onChange={async (event: any) => {
              const file = event.target.files[0];
              if (file && file.size && file.size < 0.5 * 1024 * 1024) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  setSelectedImage(reader.result as string);
                };

                const formData = new FormData();
                formData.append("file", file);
                try {
                  const token = Cookies.get("access_token");
                  const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BACK}/channel/uploadImage/${user.id}/${geust.id}`,
                    {
                      method: "POST",
                      body: formData,
                      headers: {
                        authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  toast.success("Image uploaded successfully");
                  const temp = await getVueGeust(geust.id, false);
                  setGeust(temp);
                } catch (error) {
                  toast.error("Error uploading image");
                }
              } else toast.error("Error uploading image");
            }}
          />
        </label>

        <div className="flex flex-col items-start justify-start pl-6">
          <Text
            as="div"
            className="pb-1 text-gray-400"
            style={{ fontSize: 18 }}
          >
            CHANNEL NAME
          </Text>
          <input
            type="text"
            className="bg-[#111623] text-white border border-[#1f3175]
                  placeholder-gray-300 text-sm focus:border-white
                    rounded-lg block w-full p-1.5 outline-none"
            placeholder={channelData.channelName}
            value={channelData.channelName}
            onChange={(e) => {
              if (isOwnerAdmin) {
                setErrorName("");
                setChannelData((prevState) => {
                  return { ...prevState, channelName: e.target.value };
                });
              }
            }}
          ></input>
          <p className="text-sm text-red-600">{errorName}</p>
        </div>

        <FormControl>
          <RadioGroup className="flex flex-row items-start justify-start pl-6   md:flex-col">
            <FormControlLabel
              className="text-white"
              control={
                <Radio
                  checked={channelData.channelType === ChannelType.Public}
                  value="public"
                  className="text-white"
                  onClick={() => {
                    setChannelData((prevState) => {
                      return { ...prevState, channelType: ChannelType.Public };
                    });
                  }}
                />
              }
              label="Public"
            />

            <FormControlLabel
              className="text-white"
              control={
                <Radio
                  checked={channelData.channelType === ChannelType.Private}
                  value="private"
                  className="text-white "
                  onClick={() => {
                    setChannelData((prevState) => {
                      return { ...prevState, channelType: ChannelType.Private };
                    });
                    setChannelData((prevState) => {
                      return { ...prevState, protected: false };
                    });
                  }}
                />
              }
              label="Private"
            />
          </RadioGroup>
        </FormControl>

        <div className="flex flex-col items-start justify-start pl-6">
          <FormControlLabel
            className="text-white"
            control={
              <Checkbox
                className="text-white"
                checked={channelData.protected}
                onChange={(event) => {
                  setChannelData((prevState) => {
                    return { ...prevState, protected: event.target.checked };
                  });
                  if (event.target.checked) {
                    setChannelData((prevState) => {
                      return { ...prevState, channelType: ChannelType.Public };
                    });
                    setChannelData((prevState) => {
                      return {
                        ...prevState,
                        channelPassword: channel.channelPassword,
                      };
                    });
                  } else {
                    setChannelData((prevState) => {
                      return { ...prevState, channelPassword: "" };
                    });
                  }
                }}
              />
            }
            label="Protected"
          />

          <div
            className="flex bg-[#111623] text-white border border-[#1f3175]
                  placeholder-gray-300 text-sm focus:border-white
                    rounded-lg  w-full p-1.5 outline-none"
          >
            <input
              type={isPasswordVisible ? "text" : "password"}
              className="bg-[#111623] text-white
                  placeholder-gray-300 text-sm outline-none"
              placeholder={channelData.channelPassword}
              disabled={!channelData.protected}
              required={channelData.protected}
              value={channelData.channelPassword}
              onChange={(e) => {
                setErrorKey("");
                setChannelData((prevState) => {
                  return { ...prevState, channelPassword: e.target.value };
                });
              }}
            ></input>
            <div
              className="cursor-pointer"
              onClick={() => {
                if (user.id === geust.idUserOwner) {
                  setIsPasswordVisible((pre) => {
                    return !pre;
                  });
                }
              }}
            >
              {!isPasswordVisible ? (
                <MdVisibilityOff size={18} color="white" />
              ) : (
                <MdVisibility size={18} color="white" />
              )}
            </div>
          </div>
          <p className="text-sm text-red-600">{errorKey}</p>
        </div>
      </div>

      <div className="flex flex-grow items-center justify-end md:flex-non w-3/4 py-2">
        <Text
          size="3"
          className="hover:underline cursor-pointer text-white"
          onClick={() => {
            setChannelData({ ...channel });
            setIsPasswordVisible(false);
            setErrorKey("");
            setErrorName("");
          }}
        >
          Rest
        </Text>
        <button
          onClick={() => {
            if (!isSameChannel(channel, channelData)) {
              const parsName = channelNameSchema.safeParse(
                channelData.channelName
              );
              const parskey = channelkeySchema.safeParse(
                channelData.channelPassword
              );
              if (
                parsName.success &&
                (parskey.success || !channelData.protected)
              ) {
                updateChannelServer();
              } else {
                if (!parsName.success) setErrorName("Invalid channel name");
                if (!parskey.success && channelData.protected)
                  setErrorKey("Invalid channel key");
              }
            }
          }}
          className="rounded-sm text-[#254BD6] hover:text-white hover:bg-[#254BD6] ml-3 p-1 px-3"
        >
          <Text size="3" weight="bold">
            {" "}
            Save Changes
          </Text>
        </button>
      </div>

      <hr className="border-b-[0.5px] border-gray-600 w-3/4" />

      <ToastContainer />
    </div>
  );
}
