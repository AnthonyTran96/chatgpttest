import { Session } from 'next-auth';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

import { addChatDB } from '@/lib/firebase';

const addNewChat = async (chatId: string, session: Session | null, router?: AppRouterInstance) => {
    router && router.push(`/c/${chatId}`);
    addChatDB(chatId, session);
};
export default addNewChat;
