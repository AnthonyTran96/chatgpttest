'use server';
import chatQuery from '@/lib/openai/chatQuey';
import { adminDb } from '@/firebaseAdmin';
import admin from 'firebase-admin';
import { Session } from 'next-auth';

export default async function askQuestion(prompt: string, model: string, chatId: string, session: Session | null) {
    if (!session) throw new Error('Invalid Session!!');
    const answer: string | undefined = await chatQuery(prompt, model);
    const message: Message = {
        text: answer || 'ChatGPT was unable to find an answer for that!',
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: 'ChatGPT',
            name: 'ChatGPT',
            avatar: 'https://links.papareact.com/89k',
        },
    };
    await adminDb
        .collection('users')
        .doc(session?.user?.email!)
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add(message);
    return message.text;
}
