import './globals.css';
import SectionProvider from '@/components/SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Login from '@/components/Login';
import NewChat from '@/components/NewChat';
import ChatInput from '@/components/ChatInput';
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
                        <div className=" w-screen h-screen ">
                            <ContextProvider>
                                <NewChat />
                                <Sidebar />
                            </ContextProvider>
                            {children}
                            <ChatInput />
                        </div>
                    )}
                </SectionProvider>
            </body>
        </html>
    );
}
