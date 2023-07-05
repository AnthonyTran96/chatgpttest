import ChatInput from '@/components/ChatInput';
import HomeContent from '@/components/HomeContent';
export default function Home() {
    return (
        <main className="flex w-full h-full flex-col px-6 pb-20  items-center bg-[#343541]  md:justify-center overflow-auto">
            <HomeContent />
            <ChatInput chatId="" />
        </main>
    );
}
