'use server';
import titleQuery from '@/lib/openai/titleQuery';
import { db } from '@/firebase';
import { updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Session } from 'next-auth';

export default async function addTitle(question: string, chatId: string, session: Session | null) {
    if (!session) throw new Error('Invalid Session!!');
    const title = await titleQuery(question, 'text-davinci-003');
    const updateData = {
        title: title || 'New Chat',
        createdAt: serverTimestamp(),
    };
    await updateDoc(doc(db, 'users', session?.user?.email!, 'chats', chatId), updateData);
    return updateData.title;
}
