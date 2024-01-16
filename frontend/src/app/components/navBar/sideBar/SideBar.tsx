'use client';

import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import { BiSolidLogOut } from 'react-icons/bi';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { IoMdNotifications } from 'react-icons/io';
import { IoGameController, IoSettingsSharp } from 'react-icons/io5';
import { MdLeaderboard } from 'react-icons/md';
import SBItems from './SBItems';
import SBSection from './SBSection';
import Badge from '@mui/material/Badge';
import { useEffect } from 'react';
import { useGlobalContext } from '@/app/protected/context/store';

export default function SideBar() {
  const currentPath = usePathname();
  const { user } = useGlobalContext();

  function getIconStyle(pathname: string) {
    const iconStyle = `mx-auto transition ease-in-out delay-100
        ${pathname === currentPath ? 'text-white scale-110' : 'text-gray-400'}
    // small screen
    w-4 h-4 
    min-[320px]:w-5 min-[320px]:h-5
    // Big screen
    md:w-6 md:h-6
    hover:text-white
    `;
    return iconStyle;
  }

  let sBItemsList = [
    {
      pageName: 'DashboardPage',
      icon: <GoHomeFill className={`${getIconStyle('/protected/DashboardPage')}`} />,
      index: 0,
    },
    {
      pageName: 'ChatPage',
      icon: <BsFillChatDotsFill className={`${getIconStyle('/protected/ChatPage')}`} />,
      index: 1,
    },
    {
      pageName: 'FriendsPage',
      icon: <FaUserFriends className={`${getIconStyle('/protected/FriendsPage')}`} />,
      index: 2,
    },
    {
      pageName: 'LeaderboardPage',
      icon: <MdLeaderboard className={`${getIconStyle('/protected/LeaderboardPage')}`} />,
      index: 3,
    },
    {
      pageName: 'GamePage',
      icon: <IoGameController className={`${getIconStyle('/protected/GamePage')}`} />,
      index: 4,
    },
    {
      pageName: 'NotificationPage',
      icon:
        user.nbrNotifications === 0 ? (
          <IoMdNotifications
            className={`${getIconStyle('/protected/NotificationPage')}`}
          />
        ) : (
          <Badge
            badgeContent={<div>{String(user.nbrNotifications)}</div>}
            color="primary"
          >
            <IoMdNotifications
              className={`${getIconStyle('/protected/NotificationPage')}`}
            />
          </Badge>
        ),
      index: 5,
    },
    {
      pageName: 'SettingsPage',
      icon: <IoSettingsSharp className={`${getIconStyle('/protected/SettingsPage')}`} />,
      index: 6,
    },
    {
      pageName: 'HomePage',
      icon: <BiSolidLogOut className={`${getIconStyle('/HomePage')}`} />,
      index: 7,
    },
  ];

  const handleItemClick = (index: number) => {
    if (index === 7) {
      Cookies.remove('access_token', { sameSite: 'none', secure: true });
      Cookies.remove('intra_id', { sameSite: 'none', secure: true });
    }
  };

  return (
    <div
      className=" flex flex-col   bg-color-main-dark   rounded-br-full fixed top-0 
      transition-all duration-400 ease-in-out
      h-fit 
      "
    //w-20  sm:w-24 md:w-28
    >
      <div
        className=" mx-auto  flex flex-col justify-center
                       md:h-24 h-16"
      >
        <img className="h-2/3 m-auto " src="/logo.png" alt="" />
      </div>

      <div
        className="flex flex-col justify-between 
                      h-5/6 pb-8 pt-18 "
      >
        <SBSection sectionName="Home">
          {sBItemsList.slice(0, 5).map((item) => (
            <SBItems
              key={item.pageName}
              pageName={item.pageName}
              onClick={() => handleItemClick(item.index)}
            >
              {item.icon}
            </SBItems>
          ))}
        </SBSection>

        <SBSection sectionName="Profile">
          <div className="flex flex-col items-center">
            {sBItemsList.slice(5, 8).map((item) => (
              <SBItems
                key={item.pageName}
                pageName={item.pageName}
                onClick={() => handleItemClick(item.index)}
              >
                {item.icon}
              </SBItems>
            ))}
          </div>
        </SBSection>
      </div>
    </div>
  );
}
