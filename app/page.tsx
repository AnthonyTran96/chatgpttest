import Footer from '@/components/Footer';
import HomeContent from '@/components/HomeContent';

export default function Home() {
    return (
        <main className="flex w-full h-full flex-col max-w-3xl mx-auto items-center md:justify-center ">
            <HomeContent />
            <Footer />
        </main>
    );
}
