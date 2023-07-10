'use client';
import React from 'react';
import { useState, useRef } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase';
import askQuestion from '@/lib/actions/askQuestion';
import addTitle from '@/lib/actions/addTitle';
import BlinkingDots from './BlinkingDots';

type Props = {
    chatId: string;
};

function ChatInput({ chatId }: Props) {
    const { data: session } = useSession();
    const [message, setMessage] = useState('');
    const [isEmpty, setIsEmpty] = useState(true);
    const [isHandleQuestion, setIsHandelQuestion] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('');
        setIsEmpty(true);
        inputRef.current?.focus();
        const data: Message = {
            text: message.trim(),
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image!,
            },
        };
        setIsHandelQuestion(true);
        await addDoc(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'), data);
        await askQuestion(data.text, 'text-davinci-003', chatId, session);
        setIsHandelQuestion(false);
        await addTitle(data.text, chatId, session);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const message = e.target.value;
        setMessage(message);
        message.trim() ? setIsEmpty(false) : setIsEmpty(true);
    };
    return (
        <div className="relative bottom-0 w-full max-w-3xl p-4 mx-auto border-t-[0.5px] border-gray-600 bg-[#343541] flex justify-center items-center md:border-none ">
            <form onSubmit={handleSubmit} className="w-full max-w-3xl relative flex items-center ">
                <input
                    placeholder="Send a message"
                    ref={inputRef}
                    className="w-full rounded-lg bg-[#40414f] text-base  text-gray-200 border-none outline-none p-3 "
                    value={message}
                    onChange={handleInputChange}
                    type="text"
                />
                {isHandleQuestion ? (
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
