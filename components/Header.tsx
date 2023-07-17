'use client';
import { Bars3Icon, PlusIcon } from '@heroicons/react/24/outline';
import { useContext, useRef } from 'react';
import { Context } from './ContextProvider';
import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { db } from '@/firebase';
import { useSession } from 'next-auth/react';
function Header() {
    const { chatTitle, setNewProp } = useContext(Context);
    const { data: session } = useSession();
    const titleRef = useRef<HTMLHeadingElement>(null);
    const router = useRouter();
    const handleAddChat = async () => {
        const chatData = await addDoc(collection(db, 'users', session?.user?.email!, 'chats'), {
            title: 'New Chat',
            createdAt: serverTimestamp(),
        });
        router.push(`/c/${chatData.id}`);
        setNewProp('chatTitle', 'New Chat');
    };
    return (
        <div className="flex items-center justify-between border-b-[0.5px] border-gray-600 absolute top-0  w-full text-gray-200 bg-[#343541] md:hidden">
            <div
                onClick={() => setNewProp('sidebarDisable', false)}
                className="p-2 cursor-pointer hover:text-yellow-200"
            >
                <Bars3Icon className="h-7 w-7 " />
            </div>
            <h1
                ref={titleRef}
                className={`overflow-hidden whitespace-nowrap overflow-ellipsis  ${
                    titleRef.current && titleRef.current.scrollWidth > titleRef.current.clientWidth && 'ml-5 mr-2'
                }`}
            >
                {chatTitle}
            </h1>
            <div className="p-2 cursor-pointer hover:text-yellow-200" onClick={handleAddChat}>
                <PlusIcon className="h-7 w-7 " />
            </div>
        </div>
    );
}

export default Header;
