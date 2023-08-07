'use server';
import { collection, addDoc } from 'firebase/firestore';
import { v4 as uuidV4 } from 'uuid';
import { getServerSession } from 'next-auth';

import { db } from '@/firebase';
import { ChatData } from '@/lib/types';

const addMessageDB = async (user: string, assistant: string, chatId: string) => {
    const session = await getServerSession();
    const data: ChatData = {
        user: {
            id: uuidV4(),
            content: user,
            role: 'user',
        },
        assistant: {
            id: uuidV4(),
            content: assistant || 'ChatGPT cannot find the answer for that question!',
            role: 'assistant',
        },
        createdAt: new Date(),
    };
    const res = await addDoc(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'), data);
    return res.id;
};

export default addMessageDB;
