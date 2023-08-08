'use server';
import { db } from '@/firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

const addChatDB = async (email: string, chatId: string, title?: string) => {
    await setDoc(doc(db, 'users', email, 'chats', chatId), {
        title: title || 'New Chat',
        createdAt: serverTimestamp(),
    });
};

export default addChatDB;
