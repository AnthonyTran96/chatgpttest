import { Bars3Icon, PlusIcon } from '@heroicons/react/24/outline';

function NewChat() {
    return (
        <div className="flex items-center justify-between border-b-[0.5px] border-gray-600 sticky top-0 w-full text-gray-200 bg-[#343541] z-10">
            <div className="p-2">
                <Bars3Icon className="h-7 w-7 " />
            </div>
            <h1>New Chat</h1>
            <div className="p-2">
                <PlusIcon className="h-7 w-7 " />
            </div>
        </div>
    );
}

export default NewChat;
