'use server';
import { collection, orderBy, query, getDocs } from 'firebase/firestore';

import { db } from '@/firebase';

const getAllChatsDB = async (email: string) => {
    const res = query(collection(db, 'users', email, 'chats'), orderBy('createdAt', 'asc'));
    const chats = await getDocs(res);
    const data = chats.docs.map((chat) => {
        return {
            id: chat.id,
            title: chat.data().title,
        };
    });
    return data;
};

export default getAllChatsDB;
