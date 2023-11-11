"use client"
import Box from '@mui/material/Box';
import { Avatar, Flex, ScrollArea, Text } from '@radix-ui/themes';
import { useEffect, useState } from 'react'
import { GoDotFill } from "react-icons/go";
import { useGlobalContext } from '../../../context/store';
import { checkIsBlocked, getChannelGeust, getUserForMsg, getUserGeust } from '../api/fetch-users';
import { extractHoursAndM } from './widgetMsg';
import AlertDialogFind from './FindAlert';
import AlertAddChannel from './AddChannel';


export function getColorStatus(status: any): string {
  if (status === "ACTIF") {
    return '#30f32d';
  } else if (status === "INACTIF") {
    return 'red';
  }
  return 'blue';
}


const ListUser = () => {
  const { setGeust, geust, socket, user, updateInfo } = useGlobalContext();

  const [itemList, setItemList] = useState<messageDto[]>([]);

  const [direct, setDirect] = useState<boolean>(true);

  useEffect(() => {
    const getListUsers = async () => {
      const usersList = await getUserForMsg(user.id);
      setItemList(usersList)
    };
    getListUsers();
    if (socket) {
      socket.on("findMsg2UsersResponse", getListUsers);
    }
    return () => { socket?.off("findMsg2UsersResponse", getListUsers); }
  }, [socket])

  useEffect(() => {
    const getListUsers = async () => {
      const usersList = await getUserForMsg(user.id);
      setItemList(usersList);
    };
    getListUsers();
  }, [updateInfo])

  const getDataGeust = async (tmp: messageDto) => {
    let geustTemp: geustDto;
    if (tmp.isDirectMessage)
      geustTemp = await getUserGeust(tmp.receivedId);
    else
      geustTemp = await getChannelGeust(tmp.receivedId);
    setGeust(geustTemp);
  };

  useEffect(() => {
    if (geust.id === '-1') {
      if (direct) {
        if (itemListDirect.length !== 0) {
          itemListWidget = userWidgetDirect;
          getDataGeust(itemListDirect[0]);
        } else if (itemListChannel.length !== 0) {
          getDataGeust(itemListChannel[0]);
        }
      } else {
        if (itemListChannel.length !== 0) {
          itemListWidget = userWidgetChannel;
          getDataGeust(itemListChannel[0]);
        } else if (itemListDirect.length !== 0) {
          getDataGeust(itemListDirect[0]);
        }
      }
    }
  }, [direct, itemList])

  useEffect(() => {
    if (geust.id !== '-1')
      setDirect(geust.isUser);
  }, [geust.id]);
  const [isBlocked, setIsBlocked] = useState<number>(0)

  useEffect(() => {
    if (user.id !== "-1" && geust.id !== "-1") {
      const upDateGeust = async () => {
        const check = await checkIsBlocked(user.id, geust.id);
        setIsBlocked(check);
      }
      upDateGeust();
    }
  }, [geust.id, user.id, updateInfo]);

  const widgetUser = (el: messageDto, index: number) => {
    return (
      <Flex align="center" className='relative border-b py-2 pl-1' key={index}
        style={{
          background: (el.receivedId === geust.id) ? "#f1f3f9" : 'white'
        }}
        onClick={() => {
          getDataGeust(el);
        }}>
        <Avatar
          size="3"
          src={el.receivedPic}
          radius="full"
          fallback="T"
        />
        <div className='absolute pt-6 pl-7'>
          {el.isDirectMessage ? <GoDotFill size={20}
            color={(el.receivedStatus === 'ACTIF' && isBlocked === 0) ? "#15ff00" : "#9b9c9b"} /> : <></>}
        </div>
        <Flex direction="column" className='items-start pl-2'>
          <Text size="2" weight="bold" className=''>
            {el.receivedName}
          </Text>
          {/* text-neutral-500  w-32  */}
          <Box className='w-32 line-clamp-1 overflow-hidden text-sm' >
            {(!el.isDirectMessage ? <Text weight='medium'>{el.senderName}:{' '}</Text> : <></>)}
            {el.contentMsg}
          </Box>
        </Flex>
        <Text size="1" className='absolute bottom-0 right-4'>
          {extractHoursAndM(el.createdAt)}
        </Text>
        {
          (el.receivedId === geust.id) ? <Box sx={{
            width: 6,
            height: 40,
            backgroundColor: 'blue',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10
          }}
            className='absolute right-0'>
          </Box> : <div></div>
        }
      </Flex>)
  };

  const itemListDirect = itemList.filter((item: messageDto) => item.isDirectMessage);
  const itemListChannel = itemList.filter((item: messageDto) => !item.isDirectMessage);

  const userWidgetDirect: JSX.Element | JSX.Element[] = (itemListDirect.length != 0) ? itemListDirect.map((el, index) => {
    return widgetUser(el, index)
  }) : <Text className="flex border-b justify-center">pas user</Text>


  const userWidgetChannel: JSX.Element | JSX.Element[] = (itemListChannel.length != 0) ? itemListChannel.map((el, index) => {
    return widgetUser(el, index)
  }) : <Text className="flex border-b justify-center">pas user</Text>

  let itemListWidget: JSX.Element | JSX.Element[] = [];



  let styles: string = 'px-2 py-1 my-2 rounded-[20px] text-[#3055d8] bg-white shadow-md';
  return (
    <Box style={{ width: 250, height: 600, borderRadius: 10, background: "white" }}>

      <div className="flex border-b items-center justify-between pl-2 pr-2 py-3" >
        <Text size='6' weight="bold">CHAT</Text>
        {direct ? <AlertDialogFind /> : <AlertAddChannel />}

      </div >


      <div className="flex items-center justify-around bg-[#f6f7fa] m-5 p-1 rounded-lg border-b" >
        <div style={{ cursor: 'pointer' }} className={direct ? styles : ""} onClick={() => { setDirect((pre) => !pre) }}>
          <Text size='2' weight="bold">DIRECT</Text>
        </div>
        <div style={{ cursor: 'pointer' }} className={!direct ? styles : ""} onClick={() => { setDirect((pre) => !pre) }}>
          <Text size='2' weight="bold">CHANNLES</Text>
        </div>
      </div >

      <ScrollArea scrollbars="vertical" style={{ height: 430 }}>
        <Box>
          <Flex direction="column" >
            {direct ? userWidgetDirect : userWidgetChannel}
          </Flex>
        </Box>
      </ScrollArea>
    </Box>
  );
};

export default ListUser;
