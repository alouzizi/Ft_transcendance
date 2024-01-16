'use client'
import { useEffect, useState } from 'react';
import BoxChat from './components/BoxChat';
import ListUser from './components/ListUser';
import { useGlobalContext } from '../context/store';
import Cookies from 'js-cookie';
import { Socket, io } from 'socket.io-client';

const PageChat = () => {

 
  return (
    <div className="flex justify-center items-center text-black h-[100%]  ">
      <ListUser  />
      <BoxChat  />
    </div>
  );
};

export default PageChat;
