import { getServerSession } from 'next-auth';

import { Navbar, Sidebar } from '@/components';
import { Props } from '@/lib/types';

export default async function HomeLayout({ children }: Props) {
    const session = await getServerSession();
    if (session && session.user)
        return (
            <main className=" w-screen h-screen relative">
                <Navbar />
                <div className="flex w-full h-full flex-1">
                    <Sidebar />
                    <div className="h-full bg-[#343541] flex-1 pt-[45px] w-full md:pt-0">{children}</div>
                </div>
            </main>
        );
}
