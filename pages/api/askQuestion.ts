import chatQuery from '@/lib/openai/chatQuey';
import { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '@/firebaseAdmin';
import admin from 'firebase-admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { prompt, model, chatId, session } = req.body;
    if (!prompt) res.status(400).json({ error: 'No Prompt Found!' });
    if (!model) res.status(400).json({ error: 'No Model Found!' });
    if (!chatId) res.status(400).json({ error: 'Invalid chat ID' });
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
    res.status(200).json({
        answer,
    });
}
