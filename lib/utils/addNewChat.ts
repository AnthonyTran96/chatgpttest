import { db } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { Session } from 'next-auth';

const addNewChat = async (session: Session | null, router?: AppRouterInstance) => {
    const chatData = await addDoc(collection(db, 'users', session?.user?.email!, 'chats'), {
        title: 'New Chat',
        createdAt: serverTimestamp(),
    });
    router && router.push(`/c/${chatData.id}`);
};
export default addNewChat;
