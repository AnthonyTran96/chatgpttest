'use client';
/* eslint-disable @next/next/no-img-element */
import { memo } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

function SidebarFooter() {
    const { data: session } = useSession();

    return (
        <div className="absolute bottom-0 left-0 w-full bg-[#202123] px-2 ">
            <div className="w-full border-t-[0.5px] border-gray-600 px-2 py-4">
                <div className="flex space-x-2 items-center">
                    <img src={session?.user?.image!} className="w-8 h-8 rounded-sm" alt="avatar" />
                    <p>{session?.user?.name!}</p>
                    <div
                        onClick={() => signOut()}
                        className="flex items-center space-x-1 absolute right-5 cursor-pointer font-semibold"
                    >
                        <ArrowRightOnRectangleIcon className=" w-5 h-5" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(SidebarFooter);
