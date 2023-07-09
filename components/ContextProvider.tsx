'use client';
import { createContext, useState } from 'react';

interface ContextProps {
    sidebarDisable: boolean;
    chatTitle: string;
    setNewProp: (propName: string, newValue: any) => void;
}

type Props = {
    children: React.ReactNode;
};

export const Context = createContext<ContextProps>({
    sidebarDisable: true,
    chatTitle: 'New Chat',
    setNewProp: () => {},
});

export const ContextProvider = ({ children }: Props) => {
    const [sidebarDisable, setSidebarDisable] = useState(true);
    const [chatTitle, setChatTitle] = useState('New Chat');

    const setNewProp = (propName: string, newValue: any) => {
        switch (propName) {
            case 'sidebarDisable':
                setSidebarDisable(newValue);
                break;
            case 'chatTitle':
                setChatTitle(newValue);
                break;
            default:
                break;
        }
    };

    const contextValue: ContextProps = {
        sidebarDisable,
        chatTitle,
        setNewProp,
    };

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
