import { getAllChatsDB } from '@/lib/firebase';
import { Chat } from '@/lib/types';
import { getServerSession } from 'next-auth';

export async function GET(request: Request) {
    const session = await getServerSession();
    if (!session || !session.user) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
    try {
        const chats: Chat[] = await getAllChatsDB(session?.user?.email!);
        return new Response(JSON.stringify({ chats }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error!' }), { status: 500 });
    }
}
