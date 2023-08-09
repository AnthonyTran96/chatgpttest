'use server';
import { collection, orderBy, query, getDocs } from 'firebase/firestore';

import { db } from '@/firebase';

const getAllMessageIds = async (email: string, chatId: string) => {
    const res = query(collection(db, 'users', email, 'chats', chatId, 'messages'), orderBy('createdAt', 'desc'));
    const messages = await getDocs(res);
    const messageIds = messages.docs.map((message) => message.id);
    return messageIds;
};

export default getAllMessageIds;
