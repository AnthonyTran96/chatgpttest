'use server';
import { getServerSession } from 'next-auth';

import { titleQuery } from '@/lib/openai/';
import { updateChatDB } from '../firebase';

export default async function addTitle(question: string, chatId: string) {
    const session = await getServerSession();
    if (!session || !session.user) throw new Error('unauthorized!');
    const title = await titleQuery(question, 'text-davinci-003');
    const updateData = {
        title: title || 'New Chat',
    };
    await updateChatDB(session.user.email!, chatId, updateData);
    return updateData.title;
}
