import { Dispatch, SetStateAction } from 'react';
import { Message, UseChatHelpers } from 'ai/react';

export interface Props {
    children: React.ReactNode;
}

export interface ModelParams {
    model: string;
    temperature?: number;
    max_tokens?: number;
    top_p?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
}

export interface ConversationStyle {
    style: string;
    default: boolean;
    params: ModelParams;
}

export interface ChatProps {
    chatId: string;
}

export interface ChatData {
    user: Message;
    assistant: Message;
    createdAt: Date;
}

export interface MessagesDb {
    id: string;
    message: {
        user: Message;
        assistant: Message;
    };
}

export interface ChatMemo {
    lastMessageID: string;
    chatLength: number;
}

export type ChatAction = 'REGENERATE' | 'STOP' | null;

export interface ChatRowProps {
    content: string;
    avatar: string;
    role: string;
}

export interface ChatTitleProps {
    title: string;
    id: string;
}

export type SelectOption = 'delete' | 'change' | null;

export interface CodeBlockProps {
    language: string;
    value: string;
}

export interface languageMap {
    [key: string]: string | undefined;
}

export interface Chat {
    id: string;
    title: string;
}

export interface ContextProps {
    sidebarDisable: boolean;
    chatTitle: string;
    modelParams: ModelParams;
    chats: Chat[];
    setNewProp: (propName: string, newValue: any) => void;
}

export interface ButtonProps {
    style: string;
    active: boolean;
}

export interface ChatFormProps {
    chatHelpers: UseChatHelpers;
    setResAction: Dispatch<SetStateAction<ChatAction>>;
}

export interface ChatActionBtnProps {
    chatHelpers: UseChatHelpers;
    handleMessage: (condition: boolean, userMessage: string, assistantMessage: string) => Promise<void>;
    memory: ChatMemo;
    resAction: ChatAction;
    setResAction: Dispatch<SetStateAction<ChatAction>>;
    setChatTitleById: (prompt: string) => Promise<void>;
}

export interface ChatUpdateData {
    title: string;
}
