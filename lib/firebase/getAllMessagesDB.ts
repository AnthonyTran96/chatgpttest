'use server';
import { collection, orderBy, query, getDocs } from 'firebase/firestore';

import { db } from '@/firebase';
import { MessagesDb } from '../types';

const getMessagesDB = async (email: string, chatId: string) => {
    const res = query(collection(db, 'users', email, 'chats', chatId, 'messages'), orderBy('createdAt', 'asc'));
    const messages = await getDocs(res);
    const data: MessagesDb[] = messages.docs.map((message) => {
        return {
            id: message.id,
            message: {
                user: message.data().user,
                assistant: message.data().assistant,
            },
        };
    });
    return data;
};

export default getMessagesDB;
