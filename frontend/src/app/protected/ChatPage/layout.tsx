import React from 'react';
import NavBarChat from './NavBar';
import { GlobalContextProvider } from '../../context/store';
const LayoutChat = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavBarChat />
      {children}
    </div>
  );
};

export default LayoutChat;
