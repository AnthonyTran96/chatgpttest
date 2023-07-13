'use client';
import React from 'react';
import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase';
import BlinkingDots from './BlinkingDots';
import { v4 as uuidV4 } from 'uuid';
import { useChat, Message } from 'ai/react';
import addTitle from '@/lib/actions/addTitle';

type Props = {
    chatId: string;
};

type Data = {
    user: Message;
    assistant: Message;
    createdAt: Date;
};

function ChatInput({ chatId }: Props) {
    const { data: session } = useSession();
    const [isEmpty, setIsEmpty] = useState(true);
    const { input, messages, handleInputChange, handleSubmit, isLoading } = useChat({
        id: 'ChatGPT',
        onFinish: async (message) => {
            const data: Data = {
                user: {
                    id: uuidV4(),
                    content: input,
                    role: 'user',
                },
                assistant: {
                    id: uuidV4(),
                    content: message.content || 'ChatGPT cannot find the answer for that question!',
                    role: 'assistant',
                },
                createdAt: new Date(),
            };
            await addDoc(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'), data);
            if (messages.length === 0) addTitle(input, chatId, session);
        },
    });
    const _handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleInputChange(e);
        e.target.value.trim() ? setIsEmpty(false) : setIsEmpty(true);
    };

    return (
        <div className="relative bottom-0 w-full max-w-3xl p-4 mx-auto border-t-[0.5px] border-gray-600 bg-[#343541] flex justify-center items-center md:border-none ">
            <form onSubmit={handleSubmit} className="w-full max-w-3xl relative flex items-center ">
                <input
                    placeholder="Send a message"
                    className="w-full rounded-lg bg-[#40414f] text-base  text-gray-200 border-none outline-none p-3 "
                    value={input}
                    autoFocus
                    onChange={_handleInputChange}
                    type="text"
                />
                {isLoading ? (
                    <div className="absolute right-0 p-2 flex items-center mr-2">
                        <BlinkingDots />
                    </div>
                ) : (
                    <button
                        type="submit"
                        className={`absolute right-0 p-2 flex items-center mr-2 rounded-lg ${
                            !isEmpty && 'bg-[#19c37d]'
                        } ${isEmpty && 'pointer-events-none text-gray-400'} duration-200`}
                    >
                        <PaperAirplaneIcon className="h-4 w-4" />
                    </button>
                )}
            </form>
        </div>
    );
}

export default ChatInput;
