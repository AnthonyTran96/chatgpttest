'use client';
import { useEffect, useState, useContext } from 'react';
import { Message, useChat } from 'ai/react';
import { v4 as uuidV4 } from 'uuid';

import { Context, ChatActionBtn, ChatForm } from '@/components';
import { ChatProps, ChatAction, ChatMemo, MessagesDb } from '@/lib/types';
import { addTitle } from '@/lib/utils';
import axios from '@/lib/axios';

function ChatInput({ chatId }: ChatProps) {
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
        body: { modelParams },
    });
    const { input, messages, stop, setMessages } = chatHelpers;

    const setChatTitleById = async (prompt: string) => {
        const newTitle = await addTitle(prompt, chatId);
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

    const handleErrorMessage = (error: any) => {
        const newMessage: Message[] = [...messages];
        if (newMessage[newMessage.length - 1].role === 'assistant') {
            newMessage[newMessage.length - 1].content =
                'ChatGPT cannot find the answer for that question. You can try regenerating the answer!';
        }
        if (newMessage[newMessage.length - 1].role === 'user') {
            newMessage[newMessage.length - 1].content = 'Invalid question. Please ask again!.';
        }
        setMessages(newMessage);
        setResAction('REGENERATE');
        console.error(error);
    };

    const handleMessage = async (condition: boolean, userMessage: string, assistantMessage: string) => {
        if (condition) {
            const newId = uuidV4();
            await axios.post(`api/messages/${newId}?chatId=${chatId}`, {
                user: userMessage,
                assistant: assistantMessage,
            });
            setMemory((prev) => {
                return {
                    chatLength: prev.chatLength + 1,
                    lastMessageID: newId,
                };
            });
        } else {
            try {
                await axios.put(`api/messages/${memory.lastMessageID}?chatId=${chatId}`, { message: assistantMessage });
            } catch (error) {
                handleErrorMessage(error);
            }
        }
    };

    const updateMemo = async () => {
        const res = await axios.get(`api/messages?chatId=${chatId}`);
        const messages: MessagesDb[] = res.data.messages;
        const messageIds = messages.map((message) => message.id);
        setMemory({
            lastMessageID: messageIds.length > 0 ? messageIds[messageIds.length - 1] : '',
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
