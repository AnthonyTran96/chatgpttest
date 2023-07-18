import './globals.css';
import SectionProvider from '@/components/SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextAuth/authOptions';
import Login from '@/components/Login';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { ContextProvider } from '@/components/ContextProvider';

export const metadata = {
    title: 'ChatGPT-Advanced',
    description: 'Supported by NextJS, Firebase and Openai',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    return (
        <html lang="en">
            <body className="font-sans text-gray-100 bg-[#343541]">
                <SectionProvider session={session}>
                    {!session ? (
                        <Login />
                    ) : (
                        <ContextProvider>
                            <div className=" w-screen h-screen relative">
                                <Header />
                                <div className="flex w-full h-full flex-1">
                                    <Sidebar />
                                    <div className="h-full bg-[#343541] flex-1 pt-[45px] w-full md:pt-0">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </ContextProvider>
                    )}
                </SectionProvider>
            </body>
        </html>
    );
}
