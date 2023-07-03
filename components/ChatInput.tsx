'use client';
import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

function ChatInput() {
    const [message, setMessage] = useState('');
    const [isEmpty, setIsEmpty] = useState(true);
    const handleSubmit = async () => {};
    const handleInputChange = (e: any) => {
        const message = e.target.value;
        setMessage(message);
        message.trim() ? setIsEmpty(false) : setIsEmpty(true);
    };
    return (
        <div className="fixed bottom-0 w-full p-4 border-t-[0.5px] border-gray-600 bg-[#343541]">
            <form onSubmit={handleSubmit} className="w-full relative flex items-center ">
                <input
                    placeholder="Send a message"
                    className="w-full rounded-lg bg-[#40414f] text-sm p-3 text-gray-400 break-words border-none outline-none"
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
