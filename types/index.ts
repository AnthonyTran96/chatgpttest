import { Message } from 'ai/react';
import { Session } from 'next-auth';

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

export interface ContextProps {
    sidebarDisable: boolean;
    chatTitle: string;
    modelParams: ModelParams;
    setNewProp: (propName: string, newValue: any) => void;
}

export interface SectionProviderProps extends Props {
    session: Session | null;
}

export interface ButtonProps {
    style: string;
    active: boolean;
}
