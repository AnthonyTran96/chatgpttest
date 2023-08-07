'use server';
import { db } from '@/firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getServerSession } from 'next-auth';

const addChatDB = async (chatId: string) => {
    const session = await getServerSession();
    await setDoc(doc(db, 'users', session?.user?.email!, 'chats', chatId), {
        title: 'New Chat',
        createdAt: serverTimestamp(),
    });
};

export default addChatDB;
