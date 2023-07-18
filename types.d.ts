interface Message {
    text: string;
    createdAt: admin.firebase.Timestamp;
    user: {
        _id: string;
        name: string;
        avatar: string;
    };
}

interface ModelParams {
    model: string;
    temperature?: number;
    max_tokens?: number;
    top_p?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
}
