'use server';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';
import { getServerSession } from 'next-auth';

const deleteMessagesDB = async (chatId: string) => {
    const session = await getServerSession();
    await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', chatId));
};

export default deleteMessagesDB;
