'use client';
import { useEffect, ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import { useState, useRef, useContext } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { useChat } from 'ai/react';
import { ArrowPathIcon, StopIcon } from '@heroicons/react/24/outline';
import Textarea from 'react-textarea-autosize';

import BlinkingDots from './BlinkingDots';
import { Context } from './ContextProvider';
import { ChatProps, ChatAction, ChatMemo } from '@/types';
import { addTitle } from '@/lib/utils';
import { addMessageDB, updateMessageDB, getMessagesIds } from '@/lib/firebase';

function ChatInput({ chatId }: ChatProps) {
    const { data: session } = useSession();
    const { modelParams } = useContext(Context);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [isEmpty, setIsEmpty] = useState(true);
    const [resAction, setResAction] = useState<ChatAction>('REGENERATE');
    const [memory, setMemory] = useState<ChatMemo>({
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
        body: { modelParams },
    });
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
        const messageIds = await getMessagesIds(chatId, session);
        setMemory({
            lastMessageID: messageIds.length > 0 ? messageIds[0] : '',
            chatLength: messageIds.length,
        });
    };

    useEffect(() => {
        chatId && updateMemo();
        return () => {
            stop();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <button className="custom-btn mb-3 space-x-2" onClick={handleRegenerateAction}>
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
