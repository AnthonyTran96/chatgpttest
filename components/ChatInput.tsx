'use client';
import React from 'react';
import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase';

type Props = {
    chatId: string;
};

function ChatInput({ chatId }: Props) {
    const { data: session } = useSession();
    const [message, setMessage] = useState('');
    const [isEmpty, setIsEmpty] = useState(true);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: Message = {
            text: message.trim(),
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image!,
            },
        };
        await addDoc(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'), data);
        setMessage('');
        await fetch('/api/askQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: data.text,
                model: 'text-davinci-003',
                chatId,
                session,
            }),
        });
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const message = e.target.value;
        setMessage(message);
        message.trim() ? setIsEmpty(false) : setIsEmpty(true);
    };
    return (
        <div className="fixed bottom-0 max-w-3xl w-full p-4 border-t-[0.5px] border-gray-600 bg-[#343541] flex justify-center items-center md:border-none md:pb-6">
            <form onSubmit={handleSubmit} className="w-full max-w-3xl relative flex items-center ">
                <input
                    placeholder="Send a message"
                    className="w-full rounded-lg bg-[#40414f] text-base  text-gray-200 border-none outline-none p-3 "
                    value={message}
                    onChange={handleInputChange}
                    type="text"
                />
                <button
                    type="submit"
                    className={`absolute right-0 p-2 mr-2 rounded-lg ${!isEmpty && 'bg-[#19c37d]'} duration-200`}
                >
                    <PaperAirplaneIcon className="h-4 w-4" />
                </button>
            </form>
        </div>
    );
}

export default ChatInput;
