'use client';
import ChatRow from '@/components/ChatRow';
import { useSession } from 'next-auth/react';
import { collection, orderBy, query, getDocs } from 'firebase/firestore';
import { useChat, Message } from 'ai/react';
import { useEffect, useRef } from 'react';
import { db } from '@/firebase';

type Props = {
    chatId: string;
};

function ChatDialog({ chatId }: Props) {
    const { data: session } = useSession();
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
    };
    useEffect(() => {
        setMessages([]);
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
            {messages.map((m) => (
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
