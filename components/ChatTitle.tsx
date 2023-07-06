import { deleteDoc, doc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { db } from '@/firebase';

type Props = {
    title: string;
    id: string;
};

function ChatTitle({ title, id }: Props) {
    const { data: session } = useSession();
    const pathname = usePathname();
    const router = useRouter();
    const isActive = pathname?.includes(id);
    const handleDelete = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.preventDefault();
        deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));
        router.replace('/');
    };
    return (
        <Link
            href={`/chat/${id}`}
            className={`flex items-center space-x-3 p-3 relative rounded-md w-full ${
                !isActive && 'hover:bg-gray-500/20 '
            } ${isActive && 'bg-gray-500/30'} cursor-pointer duration-200`}
        >
            <ChatBubbleLeftIcon className="h-4 w-4" />
            <p>{title}</p>
            {isActive && (
                <TrashIcon
                    onClick={handleDelete}
                    className="h-4 w-4 absolute right-2 hover:text-yellow-300 duration-150"
                />
            )}
        </Link>
    );
}

export default ChatTitle;
