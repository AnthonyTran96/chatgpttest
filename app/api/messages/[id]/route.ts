import { addMessageDB, updateMessageDB } from '@/lib/firebase';
import { getServerSession } from 'next-auth';

interface Params {
    params: {
        id: string;
    };
}

interface PostRequestBody {
    user: string;
    assistant: string;
}

interface PUTRequestBody {
    message: string;
}

export async function POST(request: Request, { params }: Params) {
    const session = await getServerSession();
    if (!session || !session.user) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get('chatId');
    const messageId = params.id;
    const { user, assistant }: PostRequestBody = await request.json();
    if (!chatId || !user || !assistant) return new Response(JSON.stringify({ error: 'Bad Request!' }), { status: 400 });
    try {
        const chatData = {
            user,
            assistant,
        };
        await addMessageDB(chatData, session.user.email!, messageId, chatId);
        return new Response('Add Message Success!', { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error!' }), { status: 500 });
    }
}

export async function PUT(request: Request, { params }: Params) {
    const session = await getServerSession();
    if (!session || !session.user) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get('chatId');
    const messageId = params.id;
    const { message }: PUTRequestBody = await request.json();
    if (!chatId || !message) return new Response(JSON.stringify({ error: 'Bad Request!' }), { status: 400 });
    try {
        await updateMessageDB(message, session.user.email!, chatId, messageId);
        return new Response('update message success!', { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error!' }), { status: 500 });
    }
}
