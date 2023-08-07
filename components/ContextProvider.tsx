'use client';
import { createContext, useState } from 'react';
import { ContextProps, Props } from '@/lib/types';

export const Context = createContext<ContextProps>({
    sidebarDisable: true,
    chatTitle: 'New Chat',
    modelParams: { model: 'gpt-3.5-turbo' },
    chats: [],
    setNewProp: () => {},
});

export const ContextProvider = ({ children }: Props) => {
    const [sidebarDisable, setSidebarDisable] = useState(true);
    const [chatTitle, setChatTitle] = useState('New Chat');
    const [modelParams, setModelParams] = useState({ model: 'gpt-3.5-turbo' });
    const [chats, setChats] = useState([]);

    const setNewProp = (propName: string, newValue: any) => {
        switch (propName) {
            case 'sidebarDisable':
                setSidebarDisable(newValue);
                break;
            case 'chatTitle':
                setChatTitle(newValue);
                break;
            case 'modelParams':
                setModelParams(newValue);
                break;
            case 'chats':
                setChats(newValue);
                break;
            default:
                break;
        }
    };

    const contextValue: ContextProps = {
        sidebarDisable,
        chatTitle,
        modelParams,
        chats,
        setNewProp,
    };

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
