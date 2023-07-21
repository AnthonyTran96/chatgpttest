'use client';
import { ChatHelpersExt } from '@/types';
import { ArrowPathIcon, StopIcon } from '@heroicons/react/24/outline';

type Props = {
    chatHelpers: ChatHelpersExt;
};

function ChatActionBtn({ chatHelpers }: Props) {
    const { messages, memory, handleMessage, stop, reload, resAction } = chatHelpers;
    const handleStopAction = async () => {
        stop();
        await handleMessage(
            memory.chatLength * 2 !== messages.length,
            messages[messages.length - 2].content,
            messages[messages.length - 1].content,
        );
    };

    const handleRegenerateAction = () => {
        reload();
    };

    return (
        <div className={`hidden ${messages.length > 0 && resAction && 'md:block'}`}>
            {resAction === 'STOP' && (
                <button
                    className="flex items-center space-x-2 p-2 border mb-3 text-sm border-gray-600 rounded-md hover:bg-gray-500/20"
                    onClick={handleStopAction}
                >
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
