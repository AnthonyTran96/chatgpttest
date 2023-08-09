import { getServerSession } from 'next-auth';

import { addChatDB, deleteChatDB, updateChatDB } from '@/lib/firebase';
import { ChatUpdateData } from '@/lib/types';

interface PUTRequestBody {
    updateData: ChatUpdateData;
}

interface Params {
    params: {
        id: string;
    };
}

export async function POST(request: Request, { params }: Params) {
    const session = await getServerSession();
    if (!session || !session.user) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
    const id = params.id;
    try {
        await addChatDB(session?.user?.email!, id);
        return new Response('Create New Chat Success!', { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error!' }), { status: 500 });
    }
}

export async function PUT(request: Request, { params }: Params) {
    const session = await getServerSession();
    if (!session || !session.user) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
    const id = params.id;
    const { updateData }: PUTRequestBody = await request.json();
    if (!updateData) return new Response(JSON.stringify({ error: 'Invalid Data!' }), { status: 400 });
    try {
        await updateChatDB(session?.user?.email!, id, updateData);
        return new Response('Update Chat Success!', { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error!' }), { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: Params) {
    const session = await getServerSession();
    if (!session || !session.user) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
    const id = params.id;
    try {
        await deleteChatDB(session?.user?.email!, id);
        return new Response('Delete Chat Success!', { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error!' }), { status: 500 });
    }
}
