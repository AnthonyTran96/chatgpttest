'use client';

/* eslint-disable @next/next/no-img-element */
type Props = {
    content: string;
    avatar: string;
    role: string;
};

function ChatRow({ content, avatar, role }: Props) {
    return (
        <div className={`${role === 'assistant' ? 'bg-[#444654]' : ''} w-full`}>
            <div className="p-4 flex space-x-4 max-w-3xl mx-auto">
                <img src={avatar} alt="avatar" className="w-8 h-8 rounded-sm" />
                <div>{content}</div>
            </div>
        </div>
    );
}

export default ChatRow;
