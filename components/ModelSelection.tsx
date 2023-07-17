function ModelSelection() {
    return (
        <fieldset className="p-3 mt-5 mb-3 border border-gray-500 rounded-xl">
            <legend>Choose a conversation style</legend>
            <ul className="flex items-center justify-center">
                <li className="basis-1/3">
                    <button className="custom-btn border-none flex-col w-full">
                        <p className="text-[11px]">More</p>
                        <p>Creative</p>
                    </button>
                </li>
                <li className="basis-1/3">
                    <button className="custom-btn border-none flex-col w-full bg-gray-500/30">
                        <p className="text-[11px]">More</p>
                        <p>Balanced</p>
                    </button>
                </li>
                <li className="basis-1/3">
                    <button className="custom-btn border-none flex-col w-full">
                        <p className="text-[11px]">More</p>
                        <p>Precise</p>
                    </button>
                </li>
            </ul>
        </fieldset>
    );
}

export default ModelSelection;
