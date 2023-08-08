import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

import axios from '../axios';

const addNewChat = async (chatId: string, router?: AppRouterInstance) => {
    router && router.push(`/c/${chatId}`);
    await axios.post(`/api/chats/${chatId}`);
};
export default addNewChat;
