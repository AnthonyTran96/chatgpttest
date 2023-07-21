'use client';
import { useEffect, ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import { useState, useRef, useContext } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { useChat } from 'ai/react';
import Textarea from 'react-textarea-autosize';

import { Context, BlinkingDots, ChatActionBtn } from '@/components';
import { ChatProps, ChatAction, ChatMemo, ChatHelpersExt } from '@/types';
import { addTitle } from '@/lib/utils';
import { addMessageDB, updateMessageDB, getMessagesIds } from '@/lib/firebase';

function ChatInput({ chatId }: ChatProps) {
    const { data: session } = useSession();
    const { chats, modelParams, setNewProp } = useContext(Context);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [isEmpty, setIsEmpty] = useState(true);
    const [resAction, setResAction] = useState<ChatAction>('REGENERATE');
    const [memory, setMemory] = useState<ChatMemo>({
        lastMessageID: '',
        chatLength: 0,
    });
    const chatHelpers = useChat({
        id: 'ChatGPT',
        onResponse: () => {
            setResAction('STOP');
        },
        onFinish: async (message) => {
            await handleMessage(!!input, input, message.content);
        },
        body: { modelParams },
    });
    const { input, messages, handleInputChange, handleSubmit, isLoading } = chatHelpers;

    const _handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        handleInputChange(e);
        e.target.value.trim() ? setIsEmpty(false) : setIsEmpty(true);
    };

    const handleMessage = async (condition: boolean, userMessage: string, assistantMessage: string) => {
        if (condition) {
            const newId = await addMessageDB(userMessage, assistantMessage, chatId, session);
            setMemory((prev) => {
                return {
                    chatLength: prev.chatLength + 1,
                    lastMessageID: newId,
                };
            });
        } else await updateMessageDB(assistantMessage, chatId, memory.lastMessageID, session);
        setResAction('REGENERATE');
        if (messages.length === 0) {
            const newTitle = await addTitle(input, chatId, session);
            const newChats = chats.map((chat) => {
                if (chat.id === chatId) {
                    return {
                        ...chat,
                        title: newTitle,
                    };
                }
                return chat;
            });
            setNewProp('chats', newChats);
        }
    };

    const _handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResAction(null);
        setIsEmpty(true);
        inputRef.current?.focus();
        handleSubmit(e);
    };

    const handleTextareaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            _handleSubmit(e as any);
        }
    };

    const updateMemo = async () => {
        const messageIds = await getMessagesIds(chatId, session);
        setMemory({
            lastMessageID: messageIds.length > 0 ? messageIds[0] : '',
            chatLength: messageIds.length,
        });
    };

    const chatHelpersExt: ChatHelpersExt = { ...chatHelpers, handleMessage, memory, resAction, setResAction };

    useEffect(() => {
        chatId && updateMemo();
        return () => {
            stop();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="relative bottom-0 w-full max-w-3xl p-4 mx-auto border-t-[0.5px] border-gray-600 flex flex-col justify-center items-center md:border-none ">
            <ChatActionBtn chatHelpers={chatHelpersExt} />
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
