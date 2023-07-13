import ChatInput from '@/components/ChatInput';
import ChatDialog from '@/components/ChatDialog';

type Props = {
    params: {
        id: string;
    };
};

function page({ params: { id } }: Props) {
    return (
        <div className="w-full h-full flex flex-col items-center ">
            <ChatDialog chatId={id} />
            <ChatInput chatId={id} />
        </div>
    );
}

export default page;
