function ModelSelection() {
    return (
        <fieldset className="p-4 mt-5 mb-3 border border-gray-500 rounded-xl">
            <legend>Choose a conversation style</legend>
            <ul className="flex items-center justify-center">
                <li className="basis-1/3">
                    <button>
                        <p className="text-xs">More</p>
                        <p>Creative</p>
                    </button>
                </li>
                <li className="basis-1/3">
                    <button>
                        <p className="text-xs">More</p>
                        <p>Creative</p>
                    </button>
                </li>
                <li className="basis-1/3">
                    <button>
                        <p className="text-xs">More</p>
                        <p>Creative</p>
                    </button>
                </li>
            </ul>
        </fieldset>
    );
}

export default ModelSelection;
