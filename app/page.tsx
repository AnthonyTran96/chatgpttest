import { Footer, HomeContent, Navbar, Sidebar } from '@/components';

export default async function Home() {
    return (
        <main className=" w-screen h-screen relative">
            <Navbar />
            <div className="flex w-full h-full flex-1">
                <Sidebar />
                <div className="h-full bg-[#343541] flex-1 pt-[45px] w-full md:pt-0">
                    <div className="flex w-full h-full flex-col max-w-3xl mx-auto items-center md:justify-center ">
                        <HomeContent />
                        <Footer />
                    </div>
                </div>
            </div>
        </main>
    );
}
