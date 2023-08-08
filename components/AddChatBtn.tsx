'use client';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { v4 as uuidV4 } from 'uuid';

import { addNewChat } from '@/lib/utils';
import { Context } from '@/components';

function AddChatBtn() {
    const router = useRouter();
    const { chats, setNewProp } = useContext(Context);
    const handleAddChat = async () => {
        const newId = uuidV4();
        addNewChat(newId, router);
        setNewProp('sidebarDisable', true);
        setNewProp('chats', [
            ...chats,
            {
                id: newId,
                title: 'New Chat',
            },
        ]);
    };
    return (
        <button
            className="w-full flex items-center space-x-2 p-[10px] border border-gray-500 rounded-md  top-0 bg-[#202123] hover:bg-gray-500/25"
            onClick={handleAddChat}
        >
            <PlusIcon className="h-4 w-4 " />
            <p className="">New chat</p>
        </button>
    );
}

export default AddChatBtn;
