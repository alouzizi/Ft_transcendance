import { GoHomeFill } from "react-icons/go";
import { BsFillChatDotsFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";

import { MdLeaderboard } from "react-icons/md";
import { IoGameController } from "react-icons/io5";
import SBSection from "./SBSection";
import SBItems from "./SBItems";

export default function SideBar() {
  const iconStyle =
    "w-6 h-6 mx-auto text-gray-400 transition ease-in-out delay-100 focus:text-white focus:scale-110 ";
  return (
    <div className="fixed flex flex-col py-8 bg-color-main-dark w-32 h-screen">
      <img className="w-16 mx-auto mb-16" src="logo.png" alt="" />
      <SBSection sectionName="Home">
        <SBItems pageName="HomePage">
          <GoHomeFill className={iconStyle} tabIndex="0" />
        </SBItems>
        <SBItems pageName="ChatPage">
          <BsFillChatDotsFill className={iconStyle} tabIndex="0" />
        </SBItems>
        <SBItems pageName="FriendsPage">
          <FaUserFriends className={iconStyle} tabIndex="0" />
        </SBItems>
        <SBItems pageName="LeaderboardPage">
          <MdLeaderboard className={iconStyle} tabIndex="0" />
        </SBItems>
        <SBItems pageName="GamePage">
          <IoGameController className={iconStyle} tabIndex="0" />
        </SBItems>
      </SBSection>
    </div>
  );
}
