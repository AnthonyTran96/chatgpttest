'use client';
import ChatRow from '@/components/ChatRow';
import { useSession } from 'next-auth/react';
import { collection, orderBy, query, getDocs } from 'firebase/firestore';
import { useChat, Message } from 'ai/react';
import { useEffect, useRef, useState } from 'react';
import { db } from '@/firebase';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';

type Props = {
    chatId: string;
};

function ChatDialog({ chatId }: Props) {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const { messages, setMessages } = useChat({
        id: 'ChatGPT',
    });
    const getMessage = async () => {
        const res = query(
            collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
            orderBy('createdAt', 'asc'),
        );
        const messages = await getDocs(res);
        let data: Message[] = [];
        messages.forEach((message) => (data = [...data, message.data().user, message.data().assistant]));
        setMessages(data);
        setLoading(false);
    };
    useEffect(() => {
        // setMessages([]);
        getMessage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const DialogRef = useRef<HTMLDivElement>(null);
    const DialogElement = DialogRef.current;
    useEffect(() => {
        if (DialogElement && DialogElement.scrollHeight > DialogElement.clientHeight) {
            DialogElement.scrollTo(0, DialogElement.scrollHeight);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

    return (
        <div className="flex flex-col flex-1 w-full h-full overflow-y-auto " ref={DialogRef}>
            {messages.length === 0 && !loading && (
                <>
                    <p className="text-center mt-10 ">Type a prompt in below to get started!</p>
                    <ArrowDownCircleIcon className="h-10 w-10 mx-auto mt-5 text-white animate-bounce" />
                </>
            )}
            {loading && (
                <div className="flex flex-1 justify-center items-center">
                    <div className="animate-pulse">...Loading Message</div>
                </div>
            )}
            {!loading &&
                messages.map((m) => (
                    <ChatRow
                        key={m.id}
                        content={m.content || 'ChatGPT cannot find the answer for that question!'}
                        role={m.role}
                        avatar={m.role === 'assistant' ? '/ChatGPT-Icon-Logo-PNG.png' : session?.user?.image!}
                    />
                ))}
        </div>
    );
}

export default ChatDialog;
