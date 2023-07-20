'use server';
import { collection, orderBy, query, getDocs } from 'firebase/firestore';
import { Session } from 'next-auth';
import { Message } from 'ai/react';

import { db } from '@/firebase';

const getMessageDB = async (session: Session | null, chatId: string) => {
    const res = query(
        collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
        orderBy('createdAt', 'asc'),
    );
    const messages = await getDocs(res);
    let data: Message[] = [];
    messages.forEach((message) => (data = [...data, message.data().user, message.data().assistant]));
    return data;
};

export default getMessageDB;
