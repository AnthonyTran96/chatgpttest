import { ChatInput, ChatDialog } from '@/components';

type Props = {
    params: {
        id: string;
    };
};

function ChatPage({ params: { id } }: Props) {
    return (
        <div className="w-full h-full flex flex-col items-center ">
            <ChatDialog chatId={id} />
            <ChatInput chatId={id} />
        </div>
    );
}

export default ChatPage;
