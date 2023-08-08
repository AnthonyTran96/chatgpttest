'use server';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';

const deleteMessagesDB = async (email: string, chatId: string) => {
    await deleteDoc(doc(db, 'users', email, 'chats', chatId));
};

export default deleteMessagesDB;
