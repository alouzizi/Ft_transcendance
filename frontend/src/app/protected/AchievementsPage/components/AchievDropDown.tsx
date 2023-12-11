"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import AchievementItem from "./AchievementItem";
import { useGlobalContext } from "../../context/store";
import { getAchievmentsData, getGlobalInfos } from "@/app/MyApi/gameApi";

export default function AchievDropDown(prompt: {
  items: string[];
  friend: ownerDto;
}) {
  const [position, setPosition] = React.useState("All");

  const { updateInfo } = useGlobalContext();
  const [globalInfo, setGlobalInfo] = React.useState<globalInfoDto>({
    NbrOfAllMatches: 0,
    NbrOfWinnedMatches: 0,
    NbrOfLosedMatches: 0,
    NbrOfFriends: 0,
    NbrOfBlockedFriends: 0,
    NbrOfInvitedFriends: 0,
  });
  let achievementsList = getAchievmentsData(globalInfo);
  const [formatedAchievementsList, setFormatedAchievementsList] =
    React.useState(achievementsList);
  // filter data
  React.useEffect(() => {
    function selectItems() {
      let achievementsListTmp = achievementsList;
      if (position === "Bronz") {
        achievementsListTmp = achievementsListTmp.filter(
          (achiev) => achiev.type === "Bronz"
        );
      } else if (position === "Selver") {
        achievementsListTmp = achievementsListTmp.filter(
          (achiev) => achiev.type === "Selver"
        );
      } else if (position === "Gold") {
        achievementsListTmp = achievementsListTmp.filter(
          (achiev) => achiev.type === "Gold"
        );
      }
      setFormatedAchievementsList(achievementsListTmp);
    }
    selectItems();
  }, [position, globalInfo, updateInfo]);

  // update the data
  React.useEffect(() => {
    async function getData() {
      try {
        const globalInfoTmp = await getGlobalInfos(prompt.friend.id);
        setGlobalInfo(globalInfoTmp);
      } catch (error: any) {
        //console.log("getData error: " + error);
      }
    }
    getData();
  }, [position]);
  return (
    <div>
      <div className="flex flex-col justify-center items-center  mb-6 md:mb-12 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className="flex flex-row justify-between w-fit bg-white text-color-main rounded-md  cursor-pointer
             py-1 px-2 md:px-4 text-sm md:text-base"
            >
              <p className="text-md ">{position}</p>
              <IoIosArrowDropdownCircle
                className=" my-auto ml-2 text-color-main "
                size={18}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              {prompt.items.map((item) => (
                <DropdownMenuRadioItem key={item} value={`${item}`}>
                  {item}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div
        className="grid gap-y-2
          
         // small screen
         grid-cols-1 

         sm:grid-cols-2 sm:gap-x-4

         // Big screen
         lg:grid-cols-3 lg:gap-x-6
        "
      >
        {formatedAchievementsList.map((achiev, index) => (
          <AchievementItem
            key={`achiev-${index}`}
            isUnlocked={achiev.isUnlocked}
            image={achiev.image}
            title={achiev.title}
            mission={achiev.mission}
            type={achiev.type}
          />
        ))}
      </div>
    </div>
  );
}
