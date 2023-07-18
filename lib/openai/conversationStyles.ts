import jsonData from './styles.json';

interface ConversationStyle {
    style: string;
    default: boolean;
    params: ModelParams;
}

export const conversationStyles: ConversationStyle[] = jsonData;
