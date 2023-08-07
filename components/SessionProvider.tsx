'use client';
import { SessionProvider as Provider } from 'next-auth/react';

import { Props } from '@/lib/types';

function SectionProvider({ children }: Props) {
    return <Provider>{children}</Provider>;
}

export default SectionProvider;
