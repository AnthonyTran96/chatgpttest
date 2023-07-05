import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import React from 'react';

type Props = {
    title: string;
    id: string;
};

function ChatTitle({ title, id }: Props) {
    return (
        <div className="flex items-center space-x-3 p-3 rounded-md w-full hover:bg-gray-500/30 cursor-pointer duration-200">
            <ChatBubbleLeftIcon className="h-4 w-4" />
            <p>{title}</p>
        </div>
    );
}

export default ChatTitle;
