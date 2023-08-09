'use client';
import { ArrowPathIcon, StopIcon } from '@heroicons/react/24/outline';

import { ChatActionBtnProps } from '@/lib/types';

function ChatActionBtn({
    chatHelpers,
    handleMessage,
    memory,
    resAction,
    setResAction,
    setChatTitleById,
}: ChatActionBtnProps) {
    const { messages, stop, reload } = chatHelpers;
    const handleStopAction = async () => {
        setResAction('REGENERATE');
        stop();
        await handleMessage(
            memory.chatLength * 2 !== messages.length,
            messages[messages.length - 2].content,
            messages[messages.length - 1].content,
        );
        if (messages.length === 2) setChatTitleById(messages[messages.length - 2].content);
    };

    const handleRegenerateAction = () => {
        reload();
    };

    return (
        <div className={`hidden ${messages.length > 0 && resAction && 'md:block'}`}>
            {resAction === 'STOP' && (
                <button className="custom-btn mb-3 space-x-2" onClick={handleStopAction}>
                    <StopIcon className="w-4 h-4" />
                    <p>Stop generating</p>
                </button>
            )}
            {resAction === 'REGENERATE' && (
                <button className="custom-btn mb-3 space-x-2" onClick={handleRegenerateAction}>
                    <ArrowPathIcon className="w-4 h-4" />
                    <p>Regenerate Response</p>
                </button>
            )}
        </div>
    );
}

export default ChatActionBtn;
