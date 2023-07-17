/* eslint-disable @next/next/no-img-element */
'use client';
import { PlusIcon, ArrowRightOnRectangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import ChatTitle from './ChatTitle';
import ModelSelection from './ModelSelection';
import { Context } from './ContextProvider';
import { db } from '@/firebase';
import { addDoc, collection, orderBy, query, serverTimestamp } from 'firebase/firestore';

function Sidebar() {
    const { data: session } = useSession();
    const { sidebarDisable, setNewProp } = useContext(Context);
    const router = useRouter();
    const [chats, loading, error] = useCollection(
        session && query(collection(db, 'users', session?.user?.email!, 'chats'), orderBy('createdAt', 'asc')),
    );

    const handleAddChat = async () => {
        const chatData = await addDoc(collection(db, 'users', session?.user?.email!, 'chats'), {
            title: 'New Chat',
            createdAt: serverTimestamp(),
        });
        router.push(`/c/${chatData.id}`);
        setNewProp('sidebarDisable', true);
    };

    return (
        <>
            <div
                className={`h-full w-full bg-gray-500/70 absolute top-0 left-0 md:hidden duration-300 ${
                    sidebarDisable ? '-z-20' : 'z-20'
                }`}
            ></div>
            <div
                className={`w-80 bg-[#202123] h-screen absolute text-sm left-0 top-0 z-30 flex flex-col p-2 pb-[70px] transition-transform duration-300 ${
                    sidebarDisable && '-translate-x-full'
                } md:translate-x-0  md:w-[260px] md:static`}
            >
                <button
                    onClick={() => setNewProp('sidebarDisable', true)}
                    className={`absolute left-[325px] top-2 rounded-md border p-2 md:hidden  ${
                        sidebarDisable && 'hidden'
                    }`}
                >
                    <XMarkIcon className="w-7 h-7" />
                </button>
                <button
                    className="w-full flex items-center space-x-2 p-[10px] border border-gray-500 rounded-md  top-0 bg-[#202123] hover:bg-gray-500/25"
                    onClick={handleAddChat}
                >
                    <PlusIcon className="h-4 w-4 " />
                    <p className="">New chat</p>
                </button>
                <ModelSelection />
                {loading && (
                    <div className="flex flex-1 justify-center items-center">
                        <div className="w-6 h-6 border-4 border-gray-300 rounded-full animate-spin"></div>
                    </div>
                )}
                {chats && (
                    <div className="mt-2 overflow-y-auto">
                        {chats.docs.map((chat) => {
                            return <ChatTitle key={chat.id} title={chat.data().title} id={chat.id} />;
                        })}
                    </div>
                )}
                {error && (
                    <div className="flex flex-1 justify-center items-center">
                        <p>{error.message}</p>
                    </div>
                )}

                <div className="absolute bottom-0 left-0 w-full bg-[#202123]  px-2 ">
                    <div className="w-full border-t-[0.5px] border-gray-600 px-2 py-4">
                        <div className="flex space-x-2 items-center">
                            <img src={session?.user?.image!} className="w-8 h-8 rounded-sm" alt="avatar" />
                            <p>{session?.user?.name!}</p>
                            <div
                                onClick={() => signOut()}
                                className="flex items-center space-x-1 absolute right-5 cursor-pointer font-semibold"
                            >
                                <ArrowRightOnRectangleIcon className=" w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
