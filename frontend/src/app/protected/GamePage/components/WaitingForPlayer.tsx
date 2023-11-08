// import React, { useContext, useEffect, useState } from 'react';
// import { WebsocketContext } from '../contexts/WebsocketContext';

// const WaitingForPlayer = () => {
//   const socket = useContext(WebsocketContext);
//   const [message, setMessage] = useState('Waiting for another player...');

//   socket.on('startGame', () => {
//     // setMessage('Game started! You can play now.');
//   console.log('Game started!');
//   });

//   useEffect(() => {

//     return () => {
//       socket.off('startGame');
//     };
//   }, []);

//   return (
//     <div>
//       <p className='bg-white'>{message}</p>
//     </div>
//   );
// };

// export default WaitingForPlayer;
