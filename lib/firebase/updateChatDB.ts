'use server';
import { doc, updateDoc } from 'firebase/firestore';

import { db } from '@/firebase';
import { ChatUpdateData } from '../types';

const updateChatDB = async (email: string, chatId: string, updateData: ChatUpdateData) => {
    await updateDoc(doc(db, 'users', email, 'chats', chatId), { ...updateData });
};

export default updateChatDB;
