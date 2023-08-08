'use client';
import { useContext, useEffect, useState } from 'react';
import { ChatTitle, Context } from '@/components';

import axios from '@/lib/axios';

function Chats() {
    const { chats, setNewProp } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const getChats = async () => {
        const res = await axios.get('/api/chats');
        const chats = await res.data.chats;
        setNewProp('chats', chats);
        setLoading(false);
    };
    useEffect(() => {
        getChats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {loading && (
                <div className="flex flex-1 justify-center items-center">
                    <div className="w-6 h-6 border-4 border-gray-300 rounded-full animate-spin"></div>
                </div>
            )}
            {chats && (
                <div className="mt-2 overflow-y-auto">
                    {chats.map((chat) => {
                        return <ChatTitle key={chat.id} title={chat.title} id={chat.id} />;
                    })}
                </div>
            )}
        </>
    );
}

export default Chats;
