import React from 'react';

const Layout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-color-main h-full">
            {children}
        </div>
    );
};
export default Layout;