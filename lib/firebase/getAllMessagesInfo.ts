'use server';
import { collection, orderBy, query, getDocs } from 'firebase/firestore';
import { Session } from 'next-auth';

import { db } from '@/firebase';

const getAllMessagesInfo = async (chatId: string, session: Session | null) => {
    const res = query(
        collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
        orderBy('createdAt', 'desc'),
    );
    const messages = await getDocs(res);
    const messageIds = messages.docs.map((message) => message.id);
    return messageIds;
};

export default getAllMessagesInfo;
