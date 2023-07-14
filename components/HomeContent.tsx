import { SunIcon, BoltIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function HomeContent() {
    return (
        <div className="flex flex-col flex-1 w-full h-full overflow-y-auto items-center px-6 md:justify-center">
            <h1 className="mt-5 text-4xl font-bold ">ChatGPT</h1>
            <div className="mt-10 block md:flex md:justify-between md:gap-3.5">
                <div className="mb-6 md:flex-1">
                    <div className="flex justify-center items-center gap-2 md:flex-col">
                        <SunIcon className="h-7 w-7" />
                        <h2 className="text-lg font-medium">Examples</h2>
                    </div>
                    <div className="mt-3 space-y-4">
                        <p className="text-info">&quot;Explain quantum computing in simple terms&quot; →</p>
                        <p className="text-info">&quot;Got any creative ideas for a 10 year old’s birthday?&quot; →</p>
                        <p className="text-info">&quot;How do I make an HTTP request in Javascript?&quot; →</p>
                    </div>
                </div>
                <div className="mb-6 md:flex-1">
                    <div className="flex justify-center items-center gap-2 md:flex-col">
                        <BoltIcon className="h-7 w-7" />
                        <h2 className="text-lg font-medium">Capabilities</h2>
                    </div>
                    <div className="mt-3 space-y-4">
                        <p className="text-info">Remembers what user said earlier in the conversation</p>
                        <p className="text-info">Allows user to provide follow-up corrections</p>
                        <p className="text-info">Trained to decline inappropriate requests</p>
                    </div>
                </div>
                <div className="mb-6 md:flex-1">
                    <div className="flex justify-center items-center gap-2 md:flex-col">
                        <ExclamationTriangleIcon className="h-7 w-7" />
                        <h2 className="text-lg font-medium">Limitations</h2>
                    </div>
                    <div className="mt-3 space-y-4">
                        <p className="text-info">May occasionally generate incorrect information</p>
                        <p className="text-info">May occasionally produce harmful instructions or biased content</p>
                        <p className="text-info">Limited knowledge of world and events after 2021</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeContent;
