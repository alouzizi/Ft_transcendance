"use client"
import Box from '@mui/material/Box';
import { Avatar, Flex, ScrollArea, Text } from '@radix-ui/themes';
import { useEffect, useState } from 'react'
import { GoDotFill } from "react-icons/go";
import { useGlobalContext } from '../../../context/store';
import { getChannelGeust, getUser, getUserForMsg, getUserGeust, getVueGeust } from '../api/fetch-users';
import { extractHoursAndM } from './widgetMsg';
import { useSession } from 'next-auth/react';
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
  const { data: session } = useSession();
  const { setGeust, setUser, geust, socket } = useGlobalContext();

  const [itemList, setItemList] = useState<MessageItemList[]>([]);


  const [direct, setDirect] = useState<boolean>(true);

  useEffect(() => {
    if (session) {
      const user: userDto = session.user;
      setUser(session.user);
      const getListUsers = async () => {
        const usersList = await getUserForMsg(user.id);
        setItemList(usersList)
      };
      getListUsers();
      if (socket) {
        socket.on("findMsg2UsersResponse", getListUsers);
        socket.on("updateData", getListUsers);
      }
    }
  }, [session])

  const getDataGeust = async (id: string, isUser: Boolean) => {
    const temp = await getVueGeust(id, isUser);
    setGeust(temp);
  };

  useEffect(() => {
    if (geust.id === "-1" && itemList.length !== 0) {
      getDataGeust(itemList[0].id, itemList[0].isDirectMsg);
    }
    // mazal matistatx
    // if (users.length === 0 && geust.id !== 0) {
    //   setUsers([geust]);
    //   setLastMsgs([])
    // }
  }, [itemList])

  const userWidget = (itemList.length != 0) ? itemList.map((el, index) => {
    return <Flex align="center" className='relative border-b py-2 pl-1' key={index}
      style={{
        background: (el.id === geust.id) ? "#f1f3f9" : 'white'
      }}
      onClick={() => {
        getDataGeust(el.id, el.isDirectMsg);
      }}>
      <Avatar
        size="3"
        src={el.avatar}
        radius="full"
        fallback="T"
      />
      <div className='absolute pt-6 pl-7'>
        {el.isDirectMsg ? <GoDotFill size={20} color={getColorStatus(el.status)} /> : <></>}
      </div>
      <Flex direction="column" className='items-start pl-2'>
        <Text size="2" weight="bold" className=''>
          {el.name}
        </Text>
        <Text className='text-neutral-500 text-sm w-32 line-clamp-1 overflow-hidden' >
          {el.lastMsg}
        </Text>
      </Flex>
      <Text size="1" className='absolute bottom-0 right-4'>
        {extractHoursAndM(el.createdAt)}
      </Text>
      {
        (el.id === geust.id) ? <Box sx={{
          width: 6,
          height: 40,
          backgroundColor: 'blue',
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10
        }}
          className='absolute right-0'>
        </Box> : <div></div>
      }
    </Flex>

  }) : <Text className="flex border-b justify-center">pas user</Text>


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
            {userWidget}
          </Flex>
        </Box>
      </ScrollArea>
    </Box>
  );
};

export default ListUser;
