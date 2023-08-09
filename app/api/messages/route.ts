import { getServerSession } from 'next-auth';

import { getMessagesDB } from '@/lib/firebase';

export async function GET(request: Request) {
    const session = await getServerSession();
    if (!session || !session.user) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get('chatId');
    if (!chatId) return new Response(JSON.stringify({ error: 'Bad Request!' }), { status: 400 });
    try {
        const messages = await getMessagesDB(session.user.email!, chatId);
        return new Response(JSON.stringify({ messages }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error!' }), { status: 500 });
    }
}
