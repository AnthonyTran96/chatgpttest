'use server';
import { collection, orderBy, query, getDocs } from 'firebase/firestore';

import { db } from '@/firebase';
import { getServerSession } from 'next-auth';

const getAllChatsDB = async () => {
    const session = await getServerSession();
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
