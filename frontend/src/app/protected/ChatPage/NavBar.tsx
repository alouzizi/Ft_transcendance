'use client';
import { Avatar, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { AiFillSetting } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import { getColorStatus } from './components/ListUser';
import { useGlobalContext } from '../../context/store';
import SignOutAlertDialog from './components/SignoutAlert';

const NavBar = () => {
  const { user } = useGlobalContext();
  return (
    <nav className="flex  border-b mb-5 px-5 h-16 items-center justify-between">
      <div className="flex items-center space-x-2">

        <Avatar size="1"
          src={user.avatar}
          radius="full"
          fallback="A" />

        <div className='absolute pt-6 pl-5'>
          <GoDotFill size={20} color={getColorStatus('ACTIF')} />
        </div>
        <Text size="3" weight="bold" className='text-white pl-2'>
          {user.username}
        </Text>
      </div>

      <div className='flex  space-x-5'>
        <Link href="/chat">
          <AiFillSetting style={{ color: 'white', fontSize: '20px' }} />
        </Link>
        <SignOutAlertDialog />
      </div>
    </nav>
  );
};

export default NavBar;
