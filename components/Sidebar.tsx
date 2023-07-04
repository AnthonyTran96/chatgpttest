/* eslint-disable @next/next/no-img-element */
'use client';
import { PlusIcon, ArrowRightOnRectangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import { useContext } from 'react';
import ChatBox from './ChatBox';
import { Context } from './ContextProvider';

function Sidebar() {
    const { data: session } = useSession();
    const { value, updateValue } = useContext(Context);
    console.log('check value:', value);
    return (
        <div
            className={`h-screen w-screen fixed left-0 top-0 text-sm duration-500 ease-in-out ${
                value ? '-z-20' : 'z-20 bg-gray-600 bg-opacity-75'
            }`}
        >
            <div
                className={`w-80 bg-[#202123] h-full p-2 overflow-x-auto duration-500 ease-in-out ${
                    value && '-translate-x-full'
                }`}
            >
                <button onClick={() => updateValue(true)} className="absolute left-[325px] top-2 rounded-md border p-2">
                    <XMarkIcon className="w-7 h-7" />
                </button>
                <button
                    className="w-full flex items-center space-x-2 p-[10px] border border-gray-500 rounded-md sticky top-0 bg-[#202123] hover:bg-gray-500/25"
                    onClick={() => updateValue(true)}
                >
                    <PlusIcon className="h-4 w-4 " />
                    <p className="">New chat</p>
                </button>

                <div className="p-1 mt-3">
                    <ChatBox>NewChat</ChatBox>
                    <ChatBox>NewChat</ChatBox>
                    <ChatBox>NewChat</ChatBox>
                </div>

                <div className="fixed bottom-0 left-0 bg-[#202123] w-80 px-2 ">
                    <div className="w-full border-t-[0.5px] border-gray-600 p-3">
                        <div className="flex space-x-2 items-center">
                            <img src={session?.user?.image!} className="w-8 h-8 rounded-sm" alt="avatar" />
                            <p>{session?.user?.name!}</p>
                            <div
                                onClick={() => signOut()}
                                className="flex items-center space-x-1 absolute right-5 cursor-pointer font-semibold"
                            >
                                <p>Sign Out</p>
                                <ArrowRightOnRectangleIcon className=" w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
