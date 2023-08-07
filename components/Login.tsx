/* eslint-disable @next/next/no-img-element */
'use client';
import { signIn } from 'next-auth/react';

function Login() {
    return (
        <div className="h-screen w-screen bg-[#11A37F] flex flex-col justify-center items-center text-center">
            <img src="/images/chatgpt.jpg" alt="chatgpt" className="w-[300px]" />
            <button
                className="text-white font-bold text-3xl animate-pulse"
                onClick={() =>
                    signIn('google', {
                        redirect: true,
                        callbackUrl: '/',
                    })
                }
            >
                Sign In to use ChatGPT
            </button>
        </div>
    );
}

export default Login;
