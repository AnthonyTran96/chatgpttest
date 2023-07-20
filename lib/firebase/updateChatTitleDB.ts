'use server';
import { Session } from 'next-auth';
import { doc, updateDoc } from 'firebase/firestore';

import { db } from '@/firebase';

const updateChatTitleDB = async (chatId: string, updateTitle: string, session: Session | null) => {
    const updateData = {
        title: updateTitle,
    };
    await updateDoc(doc(db, 'users', session?.user?.email!, 'chats', chatId), updateData);
};

export default updateChatTitleDB;
