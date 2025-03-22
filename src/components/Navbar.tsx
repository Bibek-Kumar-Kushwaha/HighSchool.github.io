import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from 'next/image'
import React from 'react'

const Navbar = async() => {
    const user = await currentUser();
    return (
        <div className='flex items-center justify-between p-4'>
            {/* Search bar */}
            <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
                <Image
                    src='/search.png'
                    alt='search bar'
                    height={14}
                    width={14}
                />
                <input type='text' placeholder='Search...'  className='w-[200px] p-2 bg-transparent outline-none'/>
            </div>
            {/* Icon Add user */}
            <div className="flex items-center gap-6 justify-end w-full">
                <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
                    <Image
                        src='/message.png'
                        alt='message icon'
                        height={20}
                        width={20}
                    />
                </div>
                <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
                    <Image
                        src='/announcement.png'
                        alt='announcement icon'
                        height={20}
                        width={20}
                    />
                    <div className="absolute -top-3 -right-3 w-5 h-5 items-center justify-center text-white text-center bg-purple-500 rounded-full text-xs">1</div>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs leading-3 font-medium">John Doe</span>
                    <span className="text-[10px] text-gray-500 text-right">Admin</span>
                </div>
                {/* <Image
                    src='/avatar.png'
                    alt='avatar icon'
                    height={36}
                    width={36}
                    className='rounded-full'
                /> */}
                 <UserButton />
            </div>
        </div>
    )
}

export default Navbar
