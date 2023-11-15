"use client"
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar, Flex, ScrollArea, Text } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { GoDotFill } from "react-icons/go";
import { IoMdAddCircle } from "react-icons/io";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useGlobalContext } from '../../../context/store';
import { checkUserIsInChannel, joinChannel, validePassword } from '../api/fetch-channel';
import { checkIsBlocked, getChannelGeust, getUserForMsg, getUserGeust } from '../api/fetch-users';
import AlertAddChannel from './AddChannel';
import AlertDialogFind from './FindAlert';
import { extractHoursAndM } from './widgetMsg';


export function getColorStatus(status: any): string {
  if (status === "ACTIF") {
    return '#30f32d';
  } else if (status === "INACTIF") {
    return 'red';
  }
  return 'blue';
}


const ListUser = () => {
  const { setGeust, geust, socket, user, updateInfo, setOpenAlertError } = useGlobalContext();

  const [itemList, setItemList] = useState<messageDto[]>([]);

  const [direct, setDirect] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const getListUsers = async () => {
      const usersList = await getUserForMsg(user.id);
      if (usersList !== undefined) setItemList(usersList);
      else setOpenAlertError(true);
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
      if (usersList !== undefined) setItemList(usersList);
      else setOpenAlertError(true);
    };
    getListUsers();
  }, [updateInfo])

  const getDataGeust = async (tmp: messageDto) => {
    let geustTemp: geustDto;
    if (tmp.isDirectMessage)
      geustTemp = await getUserGeust(tmp.receivedId);
    else
      geustTemp = await getChannelGeust(tmp.receivedId);
    if (geustTemp !== undefined) setGeust(geustTemp);
    else setOpenAlertError(true);
  };


  const [check, setCheck] = useState(false);
  useEffect(() => {
    const checked = async () => {
      const temp = await checkUserIsInChannel(user.id, geust.id);
      if (temp !== undefined && !temp) setCheck(true);
      if (temp === undefined) setOpenAlertError(true);
    }
    if (geust.id != '-1' && !geust.isUser) checked();
    if (geust.id === '-1' || check) {
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
      setCheck(false);
    }
  }, [direct, itemList, updateInfo, check])

  useEffect(() => {
    if (geust.id !== '-1')
      setDirect(geust.isUser);
  }, [geust.id]);
  const [isBlocked, setIsBlocked] = useState<number>(0)

  useEffect(() => {
    if (user.id !== "-1" && geust.id !== "-1") {
      const upDateGeust = async () => {
        const check = await checkIsBlocked(user.id, geust.id);
        if (check !== undefined) setIsBlocked(check);
        else setOpenAlertError(true);
      }
      upDateGeust();
    }
  }, [geust.id, user.id, updateInfo]);

  const widgetUser = (el: messageDto, index: number) => {
    return (
      <Flex align="center" className='relative border-b py-2 pl-3 border-[#E9ECF1] border-1.5' key={index}
        style={{
          background: (el.receivedId === geust.id) ? "#F1F3F9" : 'white'
        }}
        onClick={() => {
          if (el.isDirectMessage || el.contentMsg !== "")
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
            color={(el.receivedStatus === 'ACTIF' && isBlocked === 0) ? "#07F102" : "#B4B4B4"} /> : <></>}
        </div>


        <Flex direction="column" className='items-start pl-2'>
          <Text size="2" weight="bold" className=''>
            {el.receivedName}
          </Text>
          {el.contentMsg === "" ? <></> :
            <Box className='w-32 line-clamp-1 overflow-hidden text-sm' >
              {(!el.isDirectMessage ? <Text weight='medium'>{el.senderName}:{' '}</Text> : <></>)}
              {el.contentMsg}
            </Box>
          }
        </Flex>


        <Text size="1" className='absolute bottom-0 right-4'>
          {el.contentMsg === "" ? "" : extractHoursAndM(el.createdAt)}
        </Text>

        {
          (el.receivedId === geust.id) ? <Box sx={{
            width: 6,
            height: 40,
            backgroundColor: '#254BD6',
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15
          }}
            className='absolute right-0'>
          </Box> : <div></div>
        }

        {(el.contentMsg === "" && !el.isDirectMessage) ?
          <div className='absolute  right-6 cursor-pointer'
            onClick={async () => {
              console.log(el.isChannProtected);
              if (!el.isChannProtected) {
                await joinChannel(user.id, el.receivedId);
                socket?.emit('updateData', {
                  content: '',
                  senderId: user.id,
                  isDirectMessage: false,
                  receivedId: el.receivedId,
                });
                getDataGeust(el);
              }
              else {
                setIdChannel(el.receivedId);
                setOpenConfirm(true);
              }

            }}>
            <IoMdAddCircle size={20} />
          </div> :
          <></>}

      </Flex>)
  };

  const itemListDirect = itemList.filter(
    (item: messageDto) => {
      return (item.isDirectMessage && (
        (item.contentMsg !== "" && search === "") ||
        ((item.receivedName.includes(search) && search !== '') || search === "*")))
    });

  const itemListChannel = itemList.filter((item: messageDto) => {
    return (!item.isDirectMessage && (
      (item.contentMsg !== "" && search === "") ||
      ((item.receivedName.includes(search) && search !== '') || search === "*")))
  });

  const userWidgetDirect: JSX.Element | JSX.Element[] = (itemListDirect.length != 0) ? itemListDirect.map((el, index) => {
    return widgetUser(el, index)
  }) : <Text className="flex border-b justify-center">pas user</Text>


  const userWidgetChannel: JSX.Element | JSX.Element[] = (itemListChannel.length != 0) ? itemListChannel.map((el, index) => {
    return widgetUser(el, index)
  }) : <Text className="flex border-b justify-center">pas user</Text>

  // ALERT CONFIM PASS
  const [idChannel, setIdChannel] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isPasswordVisibleAlert, setIsPasswordVisibleAlert] = useState(false);
  const [password, setPassword] = useState('');
  const [notMatch, setNotMatch] = useState('');



  let styles: string = 'px-4 py-2 my-2 rounded-[36px] text-[#254BD6] bg-white shadow-md';
  return (
    <Box style={{ width: 300, height: 900, borderRadius: 15, background: "white" }}>


      <div className="flex border-b items-center justify-between px-2 py-2" >
        <Text size='6' weight="bold">CHAT</Text>
        {direct ? <div className='h-[40px]'></div> : <AlertAddChannel />}
      </div >


      <div className="flex items-center justify-around bg-[#F6F7FA] mx-5 my-2 rounded-[10px]" >
        <div style={{ cursor: 'pointer' }} className={direct ? styles : ""} onClick={() => { setDirect(true) }}>
          <Text size='2' weight="bold">DIRECT</Text>
        </div>
        <div style={{ cursor: 'pointer' }} className={!direct ? styles : ""} onClick={() => { setDirect(false) }}>
          <Text size='2' weight="bold">CHANNLES</Text>
        </div>
      </div >

      <div className="flex bg-[#F6F7FA] mx-5 my-3  border rounded-md" >
        <input type={"text"} className="bg-[#F6F7FA] m-1 flex flex-grow
                        text-black placeholder-gray-600 text-sm outline-none"
          value={search}
          placeholder={direct ? 'search a friends' : 'search a group'}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        >
        </input>
      </div >

      <ScrollArea scrollbars="vertical" style={{ height: 430 }}>
        <Box>
          <Flex direction="column" >
            {direct ? userWidgetDirect : userWidgetChannel}
          </Flex>
        </Box>
      </ScrollArea>



      <div>
        <Dialog open={openConfirm} onClose={() => { setOpenConfirm(false) }}>
          <DialogTitle>Confirme Action</DialogTitle>
          <DialogContent className='flex flex-col'>
            <div className='flex bg-[#f1f3f8] text-black border border-[#1f3175]
      placeholder-gray-300 text-sm focus:border-white
      rounded-lg  w-full p-1.5 outline-none'
              style={{ borderColor: (notMatch === '') ? '#1f3175' : 'red' }}
            >
              <input type={isPasswordVisibleAlert ? "text" : "password"} className="bg-[#f1f3f8]
            text-black
      placeholder-gray-300 text-sm outline-none"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setNotMatch('');
                }}
              >
              </input>
              <div className='cursor-pointer' onClick={() => { setIsPasswordVisibleAlert((pre) => { return !pre }) }}>
                {!isPasswordVisibleAlert ?
                  <MdVisibilityOff size={18} color="black" /> :
                  <MdVisibility size={18} color="black" />}
              </div>
            </div>
            <p className='text-sm text-red-600'>{notMatch}</p>

          </DialogContent>
          <DialogActions>
            <button onClick={async () => {
              let vld = false;
              if (password !== '')
                vld = await validePassword(user.id, idChannel, password);
              if (vld) {
                setOpenConfirm(false);
                await joinChannel(user.id, idChannel);
                const gst = await getChannelGeust(idChannel);
                socket?.emit('updateData', {
                  content: '',
                  senderId: user.id,
                  isDirectMessage: false,
                  receivedId: idChannel,
                });
                setGeust(gst);
                setPassword('');
              } else {
                setNotMatch('Password not Match');
              }
            }}
              className="w-fit font-meduim  py-1 rounded-md   text-white bg-[#4069ff]
            text-xs px-2
            md:text-sm lg:text-md lg:px-4">
              Confirm
            </button>
          </DialogActions>
        </Dialog>
      </div>




    </Box>
  );
};

export default ListUser;
