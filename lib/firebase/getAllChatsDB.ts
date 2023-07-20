'use server';
import { collection, orderBy, query, getDocs } from 'firebase/firestore';

import { db } from '@/firebase';
import { Session } from 'next-auth';

const getAllChatsDB = async (session: Session | null) => {
    const res = query(collection(db, 'users', session?.user?.email!, 'chats'), orderBy('createdAt', 'asc'));
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
