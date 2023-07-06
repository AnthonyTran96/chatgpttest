/* eslint-disable @next/next/no-img-element */
import React from 'react';

type Props = {
    message: string;
    avatar: string;
    user: string;
};

function ChatRow({ message, avatar, user }: Props) {
    return (
        <div className={`${user === 'ChatGPT' ? 'bg-[#444654]' : ''} w-full`}>
            <div className="p-4 flex space-x-4 max-w-3xl mx-auto">
                <img src={avatar} alt="avatar" className="w-8 h-8 rounded-sm" />
                <p>{message}</p>
            </div>
        </div>
    );
}

export default ChatRow;
