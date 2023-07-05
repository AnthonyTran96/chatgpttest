'use client';

type Props = {
    chatId: string;
};

function ChatDialog({ chatId }: Props) {
    return <div>{chatId}</div>;
}

export default ChatDialog;
