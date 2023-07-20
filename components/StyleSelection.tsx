'use client';
import { useEffect, useState, useContext } from 'react';

import StyleButton from './StyleButton';
import { Context } from './ContextProvider';
import { conversationStyles } from '@/lib/openai';

function StyleSelection() {
    const { setNewProp } = useContext(Context);
    const [style, setStyle] = useState<string>('');
    useEffect(() => {
        conversationStyles.forEach((style) => {
            if (style.default) {
                setStyle(style.style);
                setNewProp('modelParams', style.params);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <fieldset className="p-3 mt-5 mb-3 border border-gray-500 rounded-xl">
            <legend>Choose a conversation style</legend>
            <ul className="flex items-center justify-center">
                {conversationStyles.map((conversationStyle) => (
                    <li
                        key={conversationStyle.style}
                        className="basis-1/3"
                        onClick={() => {
                            setStyle(conversationStyle.style);
                            setNewProp('modelParams', conversationStyle.params);
                        }}
                    >
                        <StyleButton style={conversationStyle.style} active={style === conversationStyle.style} />
                    </li>
                ))}
            </ul>
        </fieldset>
    );
}

export default StyleSelection;
