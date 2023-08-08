'use client';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChatBubbleLeftIcon, TrashIcon, XMarkIcon, CheckIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { Context } from './ContextProvider';
import { ChatTitleProps, ChatUpdateData, SelectOption } from '@/lib/types';
import axios from '@/lib/axios';

function ChatTitle({ title, id }: ChatTitleProps) {
    const { chats, setNewProp } = useContext(Context);
    const [updateTitle, setUpdateTitle] = useState(title);
    const inputRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLAnchorElement>(null);
    const [selectOption, setSelectOption] = useState<SelectOption>(null);
    const pathname = usePathname();
    const router = useRouter();
    const isActive = pathname?.includes(id);

    const handleCheckOption = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.preventDefault();
        if (selectOption === null) return;
        if (selectOption === 'delete') {
            router.replace('/');
            const newChats = chats.filter((chat) => chat.id !== id);
            setNewProp('chats', newChats);
            setNewProp('chatTitle', 'New Chat');
            axios.delete(`api/chats/${id}`);
            return;
        }
        if (selectOption === 'change') {
            const newChats = chats.map((chat) => {
                if (chat.id === id) {
                    return {
                        ...chat,
                        title: updateTitle,
                    };
                }
                return chat;
            });
            setNewProp('chats', newChats);
            const updateData: ChatUpdateData = {
                title: updateTitle,
            };
            axios.put(`api/chats/${id}`, { updateData });
            setSelectOption(null);
            return;
        }
    };

    const handleChangeButton = async () => {
        await setSelectOption('change');
        if (inputRef.current) inputRef.current.focus();
    };

    const handleDeleteOption = () => {
        if (updateTitle !== title) setUpdateTitle(title);
        setSelectOption(null);
    };

    useEffect(() => {
        if (isActive) {
            setNewProp('chatTitle', title);
            setUpdateTitle(title);
        }
        const handleClickOutside = (event: MouseEvent) => {
            if (isActive && titleRef.current && !titleRef.current.contains(event.target as Node)) {
                // Xử lý logic khi bấm nút ra ngoài thẻ input
                setUpdateTitle(title);
                setSelectOption(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, isActive]);

    return (
        <Link
            href={`/c/${id}`}
            ref={titleRef}
            className={`flex items-center relative rounded-md space-x-3 p-3 w-full h-auto ${
                isActive ? 'bg-gray-500/30' : 'hover:bg-gray-500/20'
            } cursor-pointer duration-200`}
        >
            <ChatBubbleLeftIcon className="h-4 w-4" />
            <div className={`flex-1 overflow-hidden flex items-center ${isActive && 'pr-[50px]'} duration-200 `}>
                {selectOption === 'change' ? (
                    <input
                        className={`bg-transparent outline-8 outline-blue-600 border-none w-full `}
                        ref={inputRef}
                        type="text"
                        value={updateTitle}
                        onChange={(e) => setUpdateTitle(e.target.value)}
                        placeholder="Provide Chat Name"
                    />
                ) : (
                    <div className={`overflow-hidden whitespace-nowrap overflow-ellipsis`}>{updateTitle}</div>
                )}
            </div>
            {isActive && (
                <div className="absolute right-2 flex justify-center items-center">
                    {selectOption ? (
                        <div className="flex items-center justify-center gap-2">
                            <CheckIcon
                                onClick={handleCheckOption}
                                className={`h-4 w-4 duration-150 ${selectOption === 'delete' && 'hover:text-red-600'} ${
                                    selectOption === 'change' && 'hover:text-yellow-300'
                                } `}
                            />
                            <XMarkIcon
                                onClick={handleDeleteOption}
                                className="h-4 w-4 duration-150 hover:text-yellow-300"
                            />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <PencilSquareIcon
                                onClick={handleChangeButton}
                                className="h-4 w-4 duration-150 hover:text-yellow-300 "
                            />
                            <TrashIcon
                                onClick={() => setSelectOption('delete')}
                                className="h-4 w-4 duration-150 hover:text-yellow-300 "
                            />
                        </div>
                    )}
                </div>
            )}
        </Link>
    );
}

export default ChatTitle;
