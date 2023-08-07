'use client';
import { SessionProvider as Provider } from 'next-auth/react';

import { SectionProviderProps } from '@/lib/types';

function SectionProvider({ children, session }: SectionProviderProps) {
    return <Provider session={session}>{children}</Provider>;
}

export default SectionProvider;
