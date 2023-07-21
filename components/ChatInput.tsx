'use client';
import { useEffect, useState, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { useChat } from 'ai/react';

import { Context, ChatActionBtn, ChatForm } from '@/components';
import { ChatProps, ChatAction, ChatMemo } from '@/types';
import { addTitle } from '@/lib/utils';
import { addMessageDB, updateMessageDB, getMessagesIds } from '@/lib/firebase';

function ChatInput({ chatId }: ChatProps) {
    const { data: session } = useSession();
    const { chats, modelParams, setNewProp } = useContext(Context);
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
            if (messages.length === 0) setChatTitleById(input);
            setResAction('REGENERATE');
        },
        onError: () => {},
        body: { modelParams },
    });
    const { input, messages, stop } = chatHelpers;

    const setChatTitleById = async (prompt: string) => {
        const newTitle = await addTitle(prompt, chatId, session);
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
            <ChatActionBtn
                chatHelpers={chatHelpers}
                handleMessage={handleMessage}
                memory={memory}
                resAction={resAction}
                setResAction={setResAction}
                setChatTitleById={setChatTitleById}
            />
            <ChatForm chatHelpers={chatHelpers} setResAction={setResAction} />
        </div>
    );
}

export default ChatInput;
