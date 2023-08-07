'use server';
import { updateDoc, doc } from 'firebase/firestore';
import { getServerSession } from 'next-auth';

import { db } from '@/firebase';

const updateMessageDB = async (message: string, chatId: string, messageId: string) => {
    const session = await getServerSession();
    updateDoc(doc(db, 'users', session?.user?.email!, 'chats', chatId, 'messages', messageId), {
        'assistant.content': message || 'ChatGPT cannot find the answer for that question!',
        createdAt: new Date(),
    });
};

export default updateMessageDB;
