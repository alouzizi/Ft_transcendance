
// import Badge from "@mui/material/Badge";
// import Box from '@mui/material/Box';
// import { Avatar, Flex, Text } from '@radix-ui/themes';
// import { FaGamepad } from "react-icons/fa";
// import { IoMdAddCircle } from "react-icons/io";
// import { joinChannel } from '../api/fetch-channel';
// import { extractHoursAndM } from './widgetMsg';

// const widgetUser = (el: messageDto, index: number) => {



//     return (
//       <Flex align="center" className='relative border-b py-2 pl-3 border-[#E9ECF1] border-1.5' key={index}
//         style={{
//           background: (el.receivedId === geust.id) ? "#F1F3F9" : 'white'
//         }}
//         onClick={() => {
//           if (el.isDirectMessage || el.contentMsg !== "") {
//             getDataGeust(el);
//             setDisplayChat(true);
//           }
//         }}>
//         {el.isDirectMessage ?
//           <Badge
//             badgeContent=
//             {<div>
//               {el.inGaming ? <FaGamepad /> : <></>}
//             </div>}
//             sx={{
//               "& .MuiBadge-badge": {
//                 backgroundColor: `${(el.receivedStatus === 'ACTIF' && isBlocked === 0) ? "#07F102" : "#B4B4B4"}`,
//                 width: 15,
//                 height: 15,
//                 borderRadius: 50,
//                 border: "2px solid #ffffff",
//               },
//             }}
//             variant={el.inGaming ? "standard" : "dot"}
//             overlap="circular"
//             anchorOrigin={{
//               vertical: "bottom",
//               horizontal: "right",
//             }}
//           >
//             <Avatar
//               size="3"
//               src={el.receivedPic}
//               radius="full"
//               fallback="T"
//             />
//           </Badge>
//           :
//           <Avatar
//             size="3"
//             src={el.receivedPic}
//             radius="full"
//             fallback="T"
//           />
//         }
//         <Flex direction="column" className='items-start pl-2'>
//           <Text onClick={() => {
//             if (el.isDirectMessage) {
//               router.push(`/protected/DashboardPage/${el.receivedName}`);
//             }
//           }}
//             size="2" weight="bold"
//             className={`${el.isDirectMessage ? "hover:underline cursor-pointer" : ""}`}>
//             {el.receivedName}
//           </Text>
//           {el.contentMsg === "" ? <></> :
//             <Box className='w-32 line-clamp-1 overflow-hidden text-sm' >
//               {(!el.isDirectMessage ? <Text weight='medium'>{el.senderName}:{' '}</Text> : <></>)}
//               {el.contentMsg}
//             </Box>
//           }
//         </Flex>


//         <Text size="1" className='absolute bottom-0 right-4'>
//           {el.contentMsg === "" ? "" : extractHoursAndM(el.createdAt)}
//         </Text>

//         {
//           (el.receivedId === geust.id) ? <Box sx={{
//             width: 6,
//             height: 40,
//             backgroundColor: '#254BD6',
//             borderTopLeftRadius: 15,
//             borderBottomLeftRadius: 15
//           }}
//             className='absolute right-0'>
//           </Box> : <div></div>
//         }

//         {(el.contentMsg === "" && !el.isDirectMessage) ?
//           <div className='absolute  right-6 cursor-pointer'
//             onClick={async () => {
//               console.log(el.isChannProtected);
//               if (!el.isChannProtected) {
//                 await joinChannel(user.id, el.receivedId);
//                 socket?.emit('updateData', {
//                   content: '',
//                   senderId: user.id,
//                   isDirectMessage: false,
//                   receivedId: el.receivedId,
//                 });
//                 getDataGeust(el);
//                 setDisplayChat(true);
//               }
//               else {
//                 setIdChannel(el.receivedId);
//                 setOpenConfirm(true);
//               }

//             }}>
//             <IoMdAddCircle size={20} />
//           </div> :
//           <></>}

//       </Flex>)
//   };
