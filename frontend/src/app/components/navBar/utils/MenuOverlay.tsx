import React from 'react';
import NavLink from './NavLink';

const MenuOverlay = ({
    links,
}: {
    links: { pathname: string; title: string }[];
}) => {
    return (
        <ul className="flex flex-colf items-center justify-center bg-color-main">
            {links.map((link, index) => (
                <li key={index}>
                    <NavLink href={link.pathname} title={link.title} />
                </li>
            ))}
        </ul>
    );
};

export default MenuOverlay;