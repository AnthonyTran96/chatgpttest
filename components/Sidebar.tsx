/* eslint-disable @next/next/no-img-element */
'use client';
import { PlusIcon, ArrowRightOnRectangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
function Sidebar() {
    const { data: session } = useSession();
    return (
        <div className="h-screen w-screen fixed left-0 top-0 z-20 bg-gray-600 bg-opacity-75 text-sm ">
            <button className="absolute left-[325px] top-2 rounded-md border p-2">
                <XMarkIcon className="w-7 h-7" />
            </button>
            <div className="w-80 bg-[#202123] h-full p-2 overflow-x-auto">
                <button className="w-full flex items-center space-x-2 p-[10px] border border-gray-500 rounded-md sticky top-0 bg-[#202123]">
                    <PlusIcon className="h-4 w-4 " />
                    <p className="">New chat</p>
                </button>

                <div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi excepturi dolores tempore
                        nemo corporis saepe repellat minus facere, ipsa cum maxime impedit consectetur incidunt magnam,
                        voluptatem aperiam quasi cumque! Ullam quo at, repudiandae cum qui recusandae temporibus neque
                        voluptatem aperiam quia earum fuga impedit ratione accusamus. Animi, harum doloremque.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi excepturi dolores tempore
                        nemo corporis saepe repellat minus facere, ipsa cum maxime impedit consectetur incidunt magnam,
                        voluptatem aperiam quasi cumque! Ullam quo at, repudiandae cum qui recusandae temporibus neque
                        voluptatem aperiam quia earum fuga impedit ratione accusamus. Animi, harum doloremque.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi excepturi dolores tempore
                        nemo corporis saepe repellat minus facere, ipsa cum maxime impedit consectetur incidunt magnam,
                        voluptatem aperiam quasi cumque! Ullam quo at, repudiandae cum qui recusandae temporibus neque
                        voluptatem aperiam quia earum fuga impedit ratione accusamus. Animi, harum doloremque.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi excepturi dolores tempore
                        nemo corporis saepe repellat minus facere, ipsa cum maxime impedit consectetur incidunt magnam,
                        voluptatem aperiam quasi cumque! Ullam quo at, repudiandae cum qui recusandae temporibus neque
                        voluptatem aperiam quia earum fuga impedit ratione accusamus. Animi, harum doloremque.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam commodi excepturi dolores tempore
                        nemo corporis saepe repellat minus facere, ipsa cum maxime impedit consectetur incidunt magnam,
                        voluptatem aperiam quasi cumque! Ullam quo at, repudiandae cum qui recusandae temporibus neque
                        voluptatem aperiam quia earum fuga impedit ratione accusamus. Animi, harum doloremque.
                    </p>
                </div>

                <div className="fixed bottom-0 left-0 bg-[#202123] w-80 px-2 ">
                    <div className="w-full border-t-[0.5px] border-gray-600 p-3">
                        <div className="flex space-x-2 items-center">
                            <img src={session?.user?.image!} className="w-8 h-8 rounded-sm" alt="avatar" />
                            <p>{session?.user?.name!}</p>
                            <div
                                onClick={() => signOut()}
                                className="flex items-center space-x-1 absolute right-5 cursor-pointer font-semibold"
                            >
                                <p>Sign Out</p>
                                <ArrowRightOnRectangleIcon className=" w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
