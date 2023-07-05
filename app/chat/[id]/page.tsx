import ChatInput from '@/components/ChatInput';
import ChatDialog from '@/components/ChatDialog';

type Props = {
    params: {
        id: string;
    };
};

function page({ params: { id } }: Props) {
    return (
        <div>
            <ChatDialog chatId={id} />
            <ChatInput chatId={id} />
        </div>
    );
}

export default page;
