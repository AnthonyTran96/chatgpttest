import { SunIcon, BoltIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
export default function Home() {
    return (
        <main className="flex flex-col px-6 items-center justify-center overflow-hidden ">
            <h1 className="mt-5 text-4xl font-bold ">ChatGPT</h1>
            <div className="mt-10 ">
                <div className="mb-6">
                    <div className="flex justify-center items-center space-x-2">
                        <SunIcon className="h-7 w-7" />
                        <h2 className="text-lg font-medium">Examples</h2>
                    </div>
                    <div className="mt-3 space-y-4">
                        <p className="text-info">&quot;Explain quantum computing in simple terms&quot; →</p>
                        <p className="text-info">&quot;Got any creative ideas for a 10 year old’s birthday?&quot; →</p>
                        <p className="text-info">&quot;How do I make an HTTP request in Javascript?&quot; →</p>
                    </div>
                </div>
                <div className="mb-6">
                    <div className="flex justify-center items-center space-x-2">
                        <BoltIcon className="h-7 w-7" />
                        <h2 className="text-lg font-medium">Capabilities</h2>
                    </div>
                    <div className="mt-3 space-y-4">
                        <p className="text-info">Remembers what user said earlier in the conversation</p>
                        <p className="text-info">Allows user to provide follow-up corrections</p>
                        <p className="text-info">Trained to decline inappropriate requests</p>
                    </div>
                </div>
                <div className="mb-6">
                    <div className="flex justify-center items-center space-x-2">
                        <ExclamationCircleIcon className="h-7 w-7" />
                        <h2 className="text-lg font-medium">Limitations</h2>
                    </div>
                    <div className="mt-3 space-y-4">
                        <p className="text-info">May occasionally generate incorrect information</p>
                        <p className="text-info">May occasionally produce harmful instructions or biased content</p>
                        <p className="text-info">Limited knowledge of world and events after 2021</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
