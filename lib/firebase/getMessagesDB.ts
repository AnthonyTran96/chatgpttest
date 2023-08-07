'use server';
import { collection, orderBy, query, getDocs } from 'firebase/firestore';
import { Message } from 'ai/react';

import { db } from '@/firebase';
import { getServerSession } from 'next-auth';

const getMessagesDB = async (chatId: string) => {
    const session = await getServerSession();
    const res = query(
        collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
        orderBy('createdAt', 'asc'),
    );
    const messages = await getDocs(res);
    let data: Message[] = [];
    messages.forEach((message) => (data = [...data, message.data().user, message.data().assistant]));
    return data;
};

export default getMessagesDB;
