'use client';
import { createContext, useState } from 'react';

interface ContextProps {
    sidebarDisable: boolean;
    chatTitle: string;
    modelParams: ModelParams;
    setNewProp: (propName: string, newValue: any) => void;
}

type Props = {
    children: React.ReactNode;
};

export const Context = createContext<ContextProps>({
    sidebarDisable: true,
    chatTitle: 'New Chat',
    modelParams: { model: 'gpt-3.5-turbo' },
    setNewProp: () => {},
});

export const ContextProvider = ({ children }: Props) => {
    const [sidebarDisable, setSidebarDisable] = useState(true);
    const [chatTitle, setChatTitle] = useState('New Chat');
    const [modelParams, setModelParams] = useState({ model: 'gpt-3.5-turbo' });

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
            default:
                break;
        }
    };

    const contextValue: ContextProps = {
        sidebarDisable,
        chatTitle,
        modelParams,
        setNewProp,
    };

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
