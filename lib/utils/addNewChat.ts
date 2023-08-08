import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

import axios from '../axios';

const addNewChat = async (chatId: string, router?: AppRouterInstance) => {
    router && router.push(`/c/${chatId}`);
    await axios.post('/api/db/chat', { id: chatId });
};
export default addNewChat;
