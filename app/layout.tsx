import './globals.css';
import { ContextProvider, SectionProvider } from '@/components';

export const metadata = {
    title: 'ChatGPT-Advanced',
    description: 'Supported by NextJS, Firebase and Openai',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="font-sans text-gray-100 bg-[#343541]">
                <SectionProvider>
                    <ContextProvider>{children}</ContextProvider>
                </SectionProvider>
            </body>
        </html>
    );
}
