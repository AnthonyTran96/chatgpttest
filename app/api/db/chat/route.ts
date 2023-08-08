import { addChatDB } from '@/lib/firebase';
import { getServerSession } from 'next-auth';

interface POSTRequestBody {
    id: string;
}

export async function POST(request: Request) {
    const session = await getServerSession();
    if (!session || !session.user) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
    const { id }: POSTRequestBody = await request.json();
    try {
        await addChatDB(session?.user?.email!, id);
        return new Response('Create New Chat Success!', { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error!' }), { status: 500 });
    }
}
