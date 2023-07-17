'use client';
import { useEffect, ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import { useState, useRef } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { addDoc, collection, updateDoc, getDocs, query, orderBy, doc } from 'firebase/firestore';
import { db } from '@/firebase';
import BlinkingDots from './BlinkingDots';
import { v4 as uuidV4 } from 'uuid';
import { useChat, Message } from 'ai/react';
import addTitle from '@/lib/actions/addTitle';
import { ArrowPathIcon, StopIcon } from '@heroicons/react/24/outline';
import Textarea from 'react-textarea-autosize';

type Props = {
    chatId: string;
};

type Data = {
    user: Message;
    assistant: Message;
    createdAt: Date;
};

type Action = 'REGENERATE' | 'STOP' | null;

type Memo = {
    lastMessageID: string;
    chatLength: number;
};

function ChatInput({ chatId }: Props) {
    const { data: session } = useSession();
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [isEmpty, setIsEmpty] = useState(true);
    const [resAction, setResAction] = useState<Action>('REGENERATE');
    const [memory, setMemory] = useState<Memo>({
        lastMessageID: '',
        chatLength: 0,
    });
    const { input, messages, handleInputChange, handleSubmit, isLoading, reload, stop } = useChat({
        id: 'ChatGPT',
        onResponse: () => {
            setResAction('STOP');
        },
        onFinish: async (message) => {
            await handleMessage(!!input, input, message.content);
        },
    });
    const _handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        handleInputChange(e);
        e.target.value.trim() ? setIsEmpty(false) : setIsEmpty(true);
    };

    const addMessageDB = async (user: string, assistant: string) => {
        const data: Data = {
            user: {
                id: uuidV4(),
                content: user,
                role: 'user',
            },
            assistant: {
                id: uuidV4(),
                content: assistant || 'ChatGPT cannot find the answer for that question!',
                role: 'assistant',
            },
            createdAt: new Date(),
        };
        const res = await addDoc(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'), data);
        return res;
    };

    const updateMessageDB = async (message: string) => {
        updateDoc(doc(db, 'users', session?.user?.email!, 'chats', chatId, 'messages', memory.lastMessageID), {
            'assistant.content': message || 'ChatGPT cannot find the answer for that question!',
            createdAt: new Date(),
        });
    };

    const handleMessage = async (condition: boolean, userMessage: string, assistantMessage: string) => {
        if (condition) {
            const res = await addMessageDB(userMessage, assistantMessage);
            setMemory((prev) => {
                return {
                    chatLength: prev.chatLength + 1,
                    lastMessageID: res.id,
                };
            });
        } else await updateMessageDB(assistantMessage);
        if (messages.length === 0) addTitle(input, chatId, session);
        setResAction('REGENERATE');
    };

    const _handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResAction(null);
        setIsEmpty(true);
        inputRef.current?.focus();
        handleSubmit(e);
    };

    const handleStopAction = async () => {
        stop();
        await handleMessage(
            memory.chatLength * 2 !== messages.length,
            messages[messages.length - 2].content,
            messages[messages.length - 1].content,
        );
    };

    const handleRegenerateAction = () => {
        reload();
    };

    const handleTextareaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            _handleSubmit(e as any);
        }
    };

    const updateMemo = async () => {
        const res = query(
            collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
            orderBy('createdAt', 'desc'),
        );
        const messages = await getDocs(res);
        setMemory({
            lastMessageID: messages.docs.length > 0 ? messages.docs[0].id : '',
            chatLength: messages.docs.length,
        });
    };
    useEffect(() => {
        chatId && updateMemo();
    }, []);

    return (
        <div className="relative bottom-0 w-full max-w-3xl p-4 mx-auto border-t-[0.5px] border-gray-600 flex flex-col justify-center items-center md:border-none ">
            <div className={`hidden ${messages.length > 0 && resAction && 'md:block'}`}>
                {resAction === 'STOP' && (
                    <button
                        className="flex items-center space-x-2 p-2 border mb-3 text-sm border-gray-600 rounded-md hover:bg-gray-500/20"
                        onClick={handleStopAction}
                    >
                        <StopIcon className="w-4 h-4" />
                        <p>Stop generating</p>
                    </button>
                )}
                {resAction === 'REGENERATE' && (
                    <button
                        className="flex items-center space-x-2 p-2 border mb-3 text-sm border-gray-600 rounded-md hover:bg-gray-500/20"
                        onClick={handleRegenerateAction}
                    >
                        <ArrowPathIcon className="w-4 h-4" />
                        <p>Regenerate Response</p>
                    </button>
                )}
            </div>
            <form
                onSubmit={_handleSubmit}
                className="w-full max-w-3xl relative flex items-center overflow-y-auto rounded-lg bg-[#40414f] py-3 pl-4 pr-11"
            >
                <Textarea
                    placeholder="Send a message"
                    ref={inputRef}
                    onKeyDown={handleTextareaKeyDown}
                    rows={1}
                    maxRows={8}
                    spellCheck={false}
                    tabIndex={0}
                    className="w-full text-base resize-none bg-transparent text-gray-200 border-none outline-none over"
                    value={input}
                    autoFocus
                    onChange={_handleInputChange}
                />
                {isLoading ? (
                    <div className="absolute right-2 bottom-2 p-2 flex items-center ">
                        <BlinkingDots />
                    </div>
                ) : (
                    <button
                        type="submit"
                        className={`absolute right-2 bottom-2 p-2 flex items-center rounded-lg ${
                            !isEmpty && 'bg-[#19c37d]'
                        } ${isEmpty && 'pointer-events-none text-gray-400'} duration-200`}
                    >
                        <PaperAirplaneIcon className="h-4 w-4" />
                    </button>
                )}
            </form>
        </div>
    );
}

export default ChatInput;
