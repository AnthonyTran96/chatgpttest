'use client';
import ChatRow from '@/components/ChatRow';
import { useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';

type Props = {
    chatId: string;
};

function ChatDialog({ chatId }: Props) {
    const { data: session } = useSession();
    const [messages, loading, error] = useCollection(
        session &&
            query(
                collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
                orderBy('createdAt', 'asc'),
            ),
    );
    return (
        <div className="flex flex-col flex-1 w-full h-full overflow-y-auto ">
            {loading && (
                <div className="animate-pulse flex justify-center flex-1 items-center">....Loading Messages</div>
            )}
            {error && (
                <div className="animate-pulse flex justify-center flex-1 items-center">Error: {error.message}</div>
            )}
            {messages && (
                <div className="w-full ">
                    {messages.docs.map((doc) => (
                        <ChatRow
                            key={doc.id}
                            message={doc.data().text}
                            avatar={doc.data().user.avatar}
                            user={doc.data().user._id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ChatDialog;
