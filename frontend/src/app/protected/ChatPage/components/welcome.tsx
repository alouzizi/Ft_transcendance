'use client'
import Image from 'next/image'
import React from 'react'
import Link from "next/link";

const WelcomeMessage = () => {
    return (
        <div className="
        bg-[#F1F3F9]  rounded-[15px]  h-[600px] 
        md:ml-[15px]
        md:block
        hidden
        md:w-[50%]
        w-[90%]
        max-w-4xl
        ">
            <div className='flex flex-col items-center justify-center rounded-[15px]  h-[600px] '>
                <Image
                    className='w-[15rem]'
                    src='/wlc_msg.png'
                    alt='welcome message'
                    width={400}
                    height={400}
                />
                <div className='font-700 mt-2'>Welcome to Messages</div>
                <div className='font-serif text-center mx-5'>
                    Once you connect with a client, you'll be able to chat and collaboate here
                </div>
                <Link href="/protected/FriendsPage">
                    <button
                        className="mr-4 w-fit font-meduim  py-1 rounded-md   bg-green-700 hover:bg-green-600
                     text-white mt-2
                  // small screen
                  text-xs px-2
                  // big screen 
                  md:text-sm lg:text-md lg:px-4 
                  "
                    >Search for Friends</button>
                </Link>

            </div>
        </div>
    )
}

export default WelcomeMessage
