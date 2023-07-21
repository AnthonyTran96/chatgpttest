/* eslint-disable @next/next/no-img-element */
'use client';
import { useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { StyleSelection, Context, Chats, SidebarFooter, AddChatBtn } from '@/components';

function Sidebar() {
    const { sidebarDisable, setNewProp } = useContext(Context);

    return (
        <>
            <div
                className={`h-full w-full bg-gray-500/70 absolute top-0 left-0 md:hidden duration-300 ${
                    sidebarDisable ? '-z-20' : 'z-20'
                }`}
            ></div>
            <div
                className={`w-80 bg-[#202123] h-screen absolute text-sm left-0 top-0 z-30 flex flex-col p-2 pb-[70px] transition-transform duration-300 ${
                    sidebarDisable && '-translate-x-full'
                } md:translate-x-0  md:w-[260px] md:static`}
            >
                <button
                    onClick={() => setNewProp('sidebarDisable', true)}
                    className={`absolute left-[325px] top-2 rounded-md border p-2 md:hidden  ${
                        sidebarDisable && 'hidden'
                    }`}
                >
                    <XMarkIcon className="w-7 h-7" />
                </button>
                <AddChatBtn />
                <StyleSelection />
                <Chats />
                <SidebarFooter />
            </div>
        </>
    );
}

export default Sidebar;
