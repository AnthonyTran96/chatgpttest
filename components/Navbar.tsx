'use client';
import { useContext, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidV4 } from 'uuid';

import { Bars3Icon, PlusIcon } from '@heroicons/react/24/outline';
import { Context } from './ContextProvider';
import { addNewChat } from '@/lib/utils';

function Navbar() {
    const { chatTitle, chats, setNewProp } = useContext(Context);
    const router = useRouter();
    const titleRef = useRef<HTMLHeadingElement>(null);
    const handleAddChat = async () => {
        const newId = uuidV4();
        setNewProp('chats', [
            ...chats,
            {
                id: newId,
                title: 'New Chat',
            },
        ]);
        addNewChat(newId, router);
    };
    return (
        <div className="flex items-center justify-between border-b-[0.5px] border-gray-600 absolute top-0  w-full text-gray-200 bg-[#343541] md:hidden">
            <div
                onClick={() => setNewProp('sidebarDisable', false)}
                className="p-2 cursor-pointer hover:text-yellow-200"
            >
                <Bars3Icon className="h-7 w-7 " />
            </div>
            <h1
                ref={titleRef}
                className={`overflow-hidden whitespace-nowrap overflow-ellipsis  ${
                    titleRef.current && titleRef.current.scrollWidth > titleRef.current.clientWidth && 'ml-5 mr-2'
                }`}
            >
                {chatTitle}
            </h1>
            <div className="p-2 cursor-pointer hover:text-yellow-200" onClick={handleAddChat}>
                <PlusIcon className="h-7 w-7 " />
            </div>
        </div>
    );
}

export default Navbar;
