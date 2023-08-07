'use client';
import { ChangeEvent, FormEvent, KeyboardEvent, useState, useRef } from 'react';
import Textarea from 'react-textarea-autosize';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

import { BlinkingDots } from '@/components';
import { ChatFormProps } from '@/lib/types';

function ChatForm({ chatHelpers, setResAction }: ChatFormProps) {
    const { input, isLoading, handleSubmit, handleInputChange } = chatHelpers;
    const [isEmpty, setIsEmpty] = useState(true);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const _handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResAction(null);
        setIsEmpty(true);
        inputRef.current?.focus();
        handleSubmit(e);
    };

    const handleTextareaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            _handleSubmit(e as any);
        }
    };

    const _handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        handleInputChange(e);
        e.target.value.trim() ? setIsEmpty(false) : setIsEmpty(true);
    };
    return (
        <form
            onSubmit={_handleSubmit}
            className="w-full max-w-3xl relative flex items-center overflow-y-auto rounded-lg bg-[#40414f] py-3 pl-4 pr-11"
        >
            <Textarea
                placeholder="Send a message"
                ref={inputRef}
                onKeyDown={handleTextareaKeyDown}
                rows={1}
                maxRows={8}
                spellCheck={false}
                tabIndex={0}
                className="w-full text-base resize-none bg-transparent text-gray-200 border-none outline-none over"
                value={input}
                autoFocus
                onChange={_handleInputChange}
            />
            {isLoading ? (
                <div className="absolute right-2 bottom-2 p-2 flex items-center ">
                    <BlinkingDots />
                </div>
            ) : (
                <button
                    type="submit"
                    className={`absolute right-2 bottom-2 p-2 flex items-center rounded-lg ${
                        !isEmpty && 'bg-[#19c37d]'
                    } ${isEmpty && 'pointer-events-none text-gray-400'} duration-200`}
                >
                    <PaperAirplaneIcon className="h-4 w-4" />
                </button>
            )}
        </form>
    );
}

export default ChatForm;
