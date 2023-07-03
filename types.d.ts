interface Message {
    text: string;
    createdAt: admin.firebase.Timestamp;
    user: {
        name: string;
        email: string;
        image: string;
    };
}
