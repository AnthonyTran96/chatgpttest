interface ConversationStyle {
    style: string;
    default: boolean;
    params: {
        model: string;
        temperature?: number;
        top_p?: number;
        frequency_penalty?: number;
        presence_penalty?: number;
    };
}

const styles: ConversationStyle[] = [];
