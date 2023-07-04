'use client';
import { createContext, useState } from 'react';

interface ContextProps {
    value: boolean;
    updateValue: (newValue: boolean) => void;
}

type Props = {
    children: React.ReactNode;
};

export const Context = createContext<ContextProps>({
    value: true,
    updateValue: () => {},
});

export const ContextProvider = ({ children }: Props) => {
    const [value, setValue] = useState(true);

    const updateValue = (newValue: boolean) => {
        setValue(newValue);
    };

    return <Context.Provider value={{ value, updateValue }}>{children}</Context.Provider>;
};
