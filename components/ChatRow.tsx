'use client';
/* eslint-disable @next/next/no-img-element */
import { MemoizedReactMarkdown } from './Markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import { CodeBlock } from './Codeblock';
import { ChatRowProps } from '@/lib/types';

function ChatRow({ content, avatar, role }: ChatRowProps) {
    return (
        <div className={`${role === 'assistant' ? 'bg-[#444654]' : ''} w-full`}>
            <div className="p-4 md:py-6 md:px-0 flex max-w-3xl mx-auto relative">
                <img src={avatar} alt="avatar" className="w-8 h-8 rounded-sm absolute" />
                <div className="w-full pl-12  md:pr-12 ">
                    <MemoizedReactMarkdown
                        className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 w-full"
                        remarkPlugins={[remarkGfm, remarkMath]}
                        components={{
                            p({ children }) {
                                return <p className="mb-2 last:mb-0">{children}</p>;
                            },
                            code({ node, inline, className, children, ...props }) {
                                if (children.length) {
                                    if (children[0] == '▍') {
                                        return <span className="mt-1 animate-pulse cursor-default">▍</span>;
                                    }

                                    children[0] = (children[0] as string).replace('`▍`', '▍');
                                }

                                const match = /language-(\w+)/.exec(className || '');

                                if (inline) {
                                    return (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                }
                                return (
                                    <CodeBlock
                                        key={Math.random()}
                                        language={(match && match[1]) || ''}
                                        value={String(children).replace(/\n$/, '')}
                                        {...props}
                                    />
                                );
                            },
                        }}
                    >
                        {content}
                    </MemoizedReactMarkdown>
                </div>
            </div>
        </div>
    );
}

export default ChatRow;
