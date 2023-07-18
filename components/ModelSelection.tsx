import { conversationStyles } from '@/lib/openai/conversationStyles';
import StyleButton from './StyleButton';
import { useEffect, useState, useContext } from 'react';
import { Context } from './ContextProvider';

function ModelSelection() {
    const { setNewProp } = useContext(Context);
    const [style, setStyle] = useState<string>('');
    useEffect(() => {
        conversationStyles.forEach((style) => {
            if (style.default) {
                setStyle(style.style);
                setNewProp('modelParams', style.params);
            }
        });
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

export default ModelSelection;
