import { ConversationStyle } from '@/lib/types';

const conversationStyles: ConversationStyle[] = [
    {
        style: 'Creative',
        default: false,
        params: {
            model: 'gpt-3.5-turbo-16k',
            temperature: 0.9,
            top_p: 0.8,
        },
    },
    {
        style: 'Balanced',
        default: true,
        params: {
            model: 'gpt-3.5-turbo-16k',
            temperature: 0.6,
            top_p: 0.6,
        },
    },
    {
        style: 'Precise',
        default: false,
        params: {
            model: 'gpt-3.5-turbo-16k',
            temperature: 0.2,
            top_p: 0.2,
        },
    },
];

export default conversationStyles;
