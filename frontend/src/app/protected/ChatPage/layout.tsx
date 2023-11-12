import React from 'react';
<<<<<<< HEAD
import NavBarChat from './NavBar';
import { GlobalContextProvider } from '../../context/store';
const LayoutChat = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavBarChat />
=======

const LayoutChat = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
>>>>>>> implement the sockets successfully
      {children}
    </div>
  );
};

export default LayoutChat;
