'use server';
import { doc, updateDoc } from 'firebase/firestore';
import { getServerSession } from 'next-auth';

import { db } from '@/firebase';

const updateChatTitleDB = async (chatId: string, updateTitle: string) => {
    const session = await getServerSession();
    const updateData = {
        title: updateTitle,
    };
    await updateDoc(doc(db, 'users', session?.user?.email!, 'chats', chatId), updateData);
};

export default updateChatTitleDB;
