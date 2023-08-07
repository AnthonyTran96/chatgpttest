'use server';
import { collection, orderBy, query, getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth';

import { db } from '@/firebase';

const getMessagesIds = async (chatId: string) => {
    const session = await getServerSession();
    const res = query(
        collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
        orderBy('createdAt', 'desc'),
    );
    const messages = await getDocs(res);
    const messageIds = messages.docs.map((message) => message.id);
    return messageIds;
};

export default getMessagesIds;
