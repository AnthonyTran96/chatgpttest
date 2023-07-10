import ChatInput from '@/components/ChatInput';
import HomeContent from '@/components/HomeContent';

export default function Home() {
    return (
        <main className="flex w-full h-full flex-col px-6 max-w-3xl m-auto items-center md:justify-center ">
            <HomeContent />
            <ChatInput chatId="" />
        </main>
    );
}
