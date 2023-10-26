import React from 'react';
import NavBarChat from './NavBar';
import { GlobalContextProvider } from './Context/store';
const LayoutChat = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <GlobalContextProvider>
        <NavBarChat />
        {children}
      </GlobalContextProvider>
    </div>
  );
};

export default LayoutChat;
