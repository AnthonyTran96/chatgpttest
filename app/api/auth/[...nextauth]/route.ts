import NextAuth from 'next-auth';
import { authOptions } from '@/lib/nextAuth/authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
