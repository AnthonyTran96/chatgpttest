'use server';
import { updateDoc, doc } from 'firebase/firestore';

import { db } from '@/firebase';

const updateMessageDB = async (message: string, email: string, chatId: string, messageId: string) => {
    updateDoc(doc(db, 'users', email, 'chats', chatId, 'messages', messageId), {
        'assistant.content': message || 'ChatGPT cannot find the answer for that question!',
        createdAt: new Date(),
    });
};

export default updateMessageDB;
