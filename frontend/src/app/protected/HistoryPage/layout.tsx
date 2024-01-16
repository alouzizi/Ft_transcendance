import React from 'react';

const Layout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            {children}
        </div>
    );
};
export default Layout;