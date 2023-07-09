import './globals.css';
import SectionProvider from '@/components/SessionProvider';
import { getServerSession } from 'next-auth';
// import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { authOptions } from './api/auth/[...nextauth]/route';
import Login from '@/components/Login';
import NewChat from '@/components/NewChat';
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
                                <NewChat />
                                <div className="flex w-full h-full  ">
                                    <Sidebar />
                                    <div className="h-full w-full flex-1 bg-[#343541] ">{children}</div>
                                </div>
                            </div>
                        </ContextProvider>
                    )}
                </SectionProvider>
            </body>
        </html>
    );
}
