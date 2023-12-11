"use client";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Avatar, Flex, ScrollArea, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { FaGamepad } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useGlobalContext } from "../../context/store";
import { joinChannel, validePassword } from "../api/fetch-channel";
import {
  getChannelGeust,
  getUserForMsg,
  getUserGeust,
} from "../api/fetch-users";
import AlertAddChannel from "./AddChannel";
import { extractHoursAndM } from "./widgetMsg";

enum Status {
  ACTIF = "ACTIF",
  INACTIF = "INACTIF",
}

const ListUser = () => {
  const { setGeust, geust, socket, user, displayChat, setDisplayChat } =
    useGlobalContext();

  const [itemList, setItemList] = useState<messageDto[]>([]);

  const [direct, setDirect] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (socket && user.id !== "-1") {
      const getListUsers = async () => {
        const usersList = await getUserForMsg(user.id);
        if (usersList !== undefined) setItemList(usersList);
      };
      getListUsers();
      socket.on("emitNewMessage", getListUsers);
      return () => {
        socket.off("emitNewMessage", getListUsers);
      };
    }
  }, [socket, user.id, geust.id, direct]);

  const getDataGeust = async (tmp: messageDto) => {
    let geustTemp: geustDto;
    if (tmp.isDirectMessage) geustTemp = await getUserGeust(tmp.receivedId);
    else geustTemp = await getChannelGeust(tmp.receivedId);
    if (geustTemp !== undefined) setGeust(geustTemp);
  };

  useEffect(() => {
    if (socket) {
      const updateStatusGeust = async () => {
        if (geust.id !== "-1" && geust.isUser) {
          const geustTemp = await getUserGeust(geust.id);
          if (geustTemp !== undefined) setGeust(geustTemp);
        }
        const usersList = await getUserForMsg(user.id);
        if (usersList !== undefined) setItemList(usersList);
      };
      socket.on("updateStatusGeust", updateStatusGeust);
      return () => {
        socket.off("updateStatusGeust", updateStatusGeust);
      };
    }
  }, [socket, geust.id]);

  useEffect(() => {
    if (socket && user.id !== "-1" && geust.id !== "-1" && geust.isUser) {
      const updateStatusGeust = async () => {
        if (geust.id !== "-1" && geust.isUser) {
          const geustTemp = await getUserGeust(geust.id);
          if (geustTemp !== undefined) setGeust(geustTemp);
        }
        const usersList = await getUserForMsg(user.id);
        if (usersList !== undefined) setItemList(usersList);
      };
      socket.on("blockUserToUser", updateStatusGeust);
      return () => {
        socket.off("blockUserToUser", updateStatusGeust);
      };
    }
  }, [socket, user.id, geust.id]);

  useEffect(() => {
    if (geust.id === "-1") {
      if (direct) {
        if (itemListDirect.length !== 0) {
          getDataGeust(itemListDirect[0]);
        } else if (itemListChannel.length !== 0) {
          getDataGeust(itemListChannel[0]);
        }
      } else {
        if (itemListChannel.length !== 0) {
          getDataGeust(itemListChannel[0]);
        } else if (itemListDirect.length !== 0) {
          getDataGeust(itemListDirect[0]);
        }
      }
    }
  }, [direct, itemList, geust.id]);

  useEffect(() => {
    if (socket) {
      const kickedFromChannel = async (data: any) => {
        //console.log("kickedFromChannel called", data)
        if (geust.id === data.channelId) {
          setGeust({
            isUser: false,
            id: "-1",
            nickname: "blabla",
            profilePic: "",
            status: Status.INACTIF,
            lastSee: 0,
            lenUser: 0,
            idUserOwner: "",
            inGaming: false,
          });
          setDirect(true);
        } else {
          const usersList = await getUserForMsg(user.id);
          if (usersList !== undefined) setItemList(usersList);
        }
      };
      socket.on("kickedFromChannel", kickedFromChannel);
      return () => {
        socket.off("kickedFromChannel", kickedFromChannel);
      };
    }
  }, [socket, geust.id]);

  const widgetUser = (el: messageDto, index: number) => {
    return (
      <Flex
        align="center"
        className="relative border-b py-2 pl-3 border-[#E9ECF1] border-1.5 cursor-pointer"
        key={index}
        style={{
          background: el.receivedId === geust.id ? "#F1F3F9" : "white",
        }}
        onClick={() => {
          if (el.isDirectMessage || el.contentMsg !== "") {
            getDataGeust(el);
            setDisplayChat(true);
          }
        }}
      >
        {el.isDirectMessage ? (
          <Badge
            badgeContent={<div>{el.inGaming ? <FaGamepad /> : <></>}</div>}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: `${
                  el.receivedStatus === "ACTIF" && !el.isBlocked
                    ? "#07F102"
                    : "#B4B4B4"
                }`,
                width: 15,
                height: 15,
                borderRadius: 50,
                border: "2px solid #ffffff",
              },
            }}
            variant={el.inGaming && !el.isBlocked ? "standard" : "dot"}
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Avatar size="3" src={el.receivedPic} radius="full" fallback="T" />
          </Badge>
        ) : (
          <Avatar size="3" src={el.receivedPic} radius="full" fallback="T" />
        )}
        <Flex direction="column" className="items-start pl-2">
          <Text size="2" weight="bold">
            {el.receivedName}
          </Text>
          {el.contentMsg === "" ? (
            <></>
          ) : (
            <Box className="w-32 line-clamp-1 overflow-hidden text-sm">
              {!el.isDirectMessage ? (
                <Text weight="medium">{el.senderName}: </Text>
              ) : (
                <></>
              )}
              {el.contentMsg}
            </Box>
          )}
        </Flex>

        <Text size="1" className="absolute bottom-0 right-4">
          {el.contentMsg === "" ? "" : extractHoursAndM(el.createdAt)}
        </Text>

        {el.receivedId === geust.id ? (
          <Box
            sx={{
              width: 6,
              height: 40,
              backgroundColor: "#254BD6",
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
            }}
            className="absolute right-0"
          ></Box>
        ) : (
          <div></div>
        )}

        {el.nbrMessageNoRead !== 0 ? (
          <div className="absolute right-1/3 text-white">
            <Badge
              badgeContent={el.nbrMessageNoRead}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#254BD6",
                },
              }}
            ></Badge>
          </div>
        ) : (
          <div></div>
        )}

        {el.contentMsg === "" && !el.isDirectMessage ? (
          <div
            className="absolute  right-6 cursor-pointer"
            onClick={async () => {
              if (!el.isChannProtected) {
                await joinChannel(user.id, el.receivedId);
                socket?.emit("updateChannel", {
                  senderId: user.id,
                  receivedId: el.receivedId,
                  isDirectMessage: false,
                });
                getDataGeust(el);
                setDisplayChat(true);
              } else {
                setIdChannel(el.receivedId);
                setOpenConfirm(true);
              }
            }}
          >
            <IoMdAddCircle size={20} />
          </div>
        ) : (
          <></>
        )}
      </Flex>
    );
  };

  const itemListDirect = itemList.filter((item: messageDto) => {
    return (
      item.isDirectMessage &&
      ((item.contentMsg !== "" && search === "") ||
        (item.receivedName.includes(search) && search !== "") ||
        search === "*")
    );
  });
  const userWidgetDirect: JSX.Element | JSX.Element[] =
    itemListDirect.length != 0 ? (
      itemListDirect.map((el, index) => {
        return widgetUser(el, index);
      })
    ) : (
      <Text className="flex border-b justify-center">pas user</Text>
    );

  const itemListChannel = itemList.filter((item: messageDto) => {
    return (
      !item.isDirectMessage &&
      ((item.contentMsg !== "" && search === "") ||
        (item.receivedName.includes(search) && search !== "") ||
        search === "*")
    );
  });
  const userWidgetChannel: JSX.Element | JSX.Element[] =
    itemListChannel.length != 0 ? (
      itemListChannel.map((el, index) => {
        return widgetUser(el, index);
      })
    ) : (
      <Text className="flex border-b justify-center">pas channel</Text>
    );

  // ALERT CONFIM PASS
  const [idChannel, setIdChannel] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isPasswordVisibleAlert, setIsPasswordVisibleAlert] = useState(false);
  const [password, setPassword] = useState("");
  const [notMatch, setNotMatch] = useState("");

  let styles: string =
    "px-4 py-2 my-2 rounded-[36px] text-[#254BD6] bg-white shadow-md";
  return (
    <Box
      className={
        // h900px
        `bg-white h-[800px] w-[90%] rounded-[15px]
        ${!displayChat ? "" : "hidden"}
        md:block
        md:w-[300px]`
      }
    >
      <div className="flex border-b items-center justify-between p-4">
        <Text size="5" weight="bold">
          CHAT
        </Text>
        {direct ? (
          <div className="h-[40px] w-[50px]"></div>
        ) : (
          <AlertAddChannel />
        )}
      </div>

      <div className="flex items-center justify-around bg-[#F6F7FA] mx-5 my-2 rounded-[10px]">
        <div
          style={{ cursor: "pointer" }}
          className={direct ? styles : ""}
          onClick={() => {
            setDirect(true);
          }}
        >
          <Text size="2" weight="bold">
            DIRECT
          </Text>
        </div>
        <div
          style={{ cursor: "pointer" }}
          className={!direct ? styles : ""}
          onClick={() => {
            setDirect(false);
          }}
        >
          <Text size="2" weight="bold">
            CHANNLES
          </Text>
        </div>
      </div>

      <div className="flex bg-[#F6F7FA] mx-5 my-3  border rounded-md">
        <input
          type={"text"}
          className="bg-[#F6F7FA] m-1 flex flex-grow
                        text-black placeholder-gray-600 text-sm outline-none"
          value={search}
          placeholder={direct ? "search a friends" : "search a group"}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
      </div>

      <ScrollArea scrollbars="vertical" style={{ height: 600 }}>
        <Box>
          <Flex direction="column">
            {direct ? userWidgetDirect : userWidgetChannel}
          </Flex>
        </Box>
      </ScrollArea>

      <div>
        <Dialog
          open={openConfirm}
          onClose={() => {
            setOpenConfirm(false);
          }}
        >
          <DialogTitle>Confirme Action</DialogTitle>
          <DialogContent className="flex flex-col">
            <div
              className="flex bg-[#f1f3f8] text-black border border-[#1f3175]
      placeholder-gray-300 text-sm focus:border-white
      rounded-lg  w-full p-1.5 outline-none"
              style={{ borderColor: notMatch === "" ? "#1f3175" : "red" }}
            >
              <input
                type={isPasswordVisibleAlert ? "text" : "password"}
                className="bg-[#f1f3f8]
            text-black
      placeholder-gray-300 text-sm outline-none"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setNotMatch("");
                }}
              ></input>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setIsPasswordVisibleAlert((pre) => {
                    return !pre;
                  });
                }}
              >
                {!isPasswordVisibleAlert ? (
                  <MdVisibilityOff size={18} color="black" />
                ) : (
                  <MdVisibility size={18} color="black" />
                )}
              </div>
            </div>
            <p className="text-sm text-red-600">{notMatch}</p>
          </DialogContent>
          <DialogActions>
            <button
              onClick={async () => {
                let vld = false;
                if (password.trim() !== "")
                  vld = await validePassword(user.id, idChannel, password);
                if (vld) {
                  setOpenConfirm(false);
                  await joinChannel(user.id, idChannel);
                  const gst = await getChannelGeust(idChannel);
                  socket?.emit("updateChannel", {
                    senderId: user.id,
                    receivedId: idChannel,
                    isDirectMessage: false,
                  });
                  setGeust(gst);
                  setDisplayChat(true);
                  setPassword("");
                } else {
                  setNotMatch("Password not Match");
                }
              }}
              className="w-fit font-meduim  py-1 rounded-md   text-white bg-[#4069ff]
            text-xs px-2
            md:text-sm lg:text-md lg:px-4"
            >
              Confirm
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
};

export default ListUser;
