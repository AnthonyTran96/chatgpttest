import { Footer, HomeContent } from '@/components';

export default function Home() {
    return (
        <div className="flex w-full h-full flex-col max-w-3xl mx-auto items-center md:justify-center ">
            <HomeContent />
            <Footer />
        </div>
    );
}
