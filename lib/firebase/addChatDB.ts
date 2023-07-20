'use server';
import { db } from '@/firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Session } from 'next-auth';

const addChatDB = async (chatId: string, session: Session | null) => {
    await setDoc(doc(db, 'users', session?.user?.email!, 'chats', chatId), {
        title: 'New Chat',
        createdAt: serverTimestamp(),
    });
};

export default addChatDB;
