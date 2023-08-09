'use server';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidV4 } from 'uuid';

import { db } from '@/firebase';
import { ChatData } from '@/lib/types';

interface ChatMessageData {
    user: string;
    assistant: string;
}

const addMessageDB = async (chatData: ChatMessageData, email: string, messageId: string, chatId: string) => {
    const data: ChatData = {
        user: {
            id: uuidV4(),
            content: chatData.user,
            role: 'user',
        },
        assistant: {
            id: uuidV4(),
            content: chatData.assistant || 'ChatGPT cannot find the answer for that question!',
            role: 'assistant',
        },
        createdAt: new Date(),
    };
    await setDoc(doc(db, 'users', email, 'chats', chatId, 'messages', messageId), data);
};

export default addMessageDB;
