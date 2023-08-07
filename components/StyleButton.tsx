import { memo } from 'react';

import { ButtonProps } from '@/lib/types';

function StyleButton({ style, active }: ButtonProps) {
    return (
        <button className={`custom-btn border-none flex-col w-full ${active && 'bg-gray-500/30'}`}>
            <p className="text-[11px]">More</p>
            <p>{style}</p>
        </button>
    );
}

export default memo(StyleButton);
