'use server';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';
import { Session } from 'next-auth';

const deleteMessagesDB = async (chatId: string, session: Session | null) => {
    await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', chatId));
};

export default deleteMessagesDB;
