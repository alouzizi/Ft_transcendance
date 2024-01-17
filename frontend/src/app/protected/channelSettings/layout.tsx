import React from 'react';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pl-10 bg-color-main h-full">
      {children}
    </div>
  );
};
export default Layout;