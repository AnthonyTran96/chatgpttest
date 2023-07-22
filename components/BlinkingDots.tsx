'use client';
import { useState, useEffect, memo } from 'react';

const BlinkingDots = () => {
    const [dots, setDots] = useState(1);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => {
                if (prevDots === 1) {
                    return 2;
                } else if (prevDots === 2) {
                    return 3;
                } else {
                    return 1;
                }
            });
            setVisible(true);
        }, 500);

        setTimeout(() => {
            setVisible(false);
        }, 250);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="flex items-center h-4 w-4">
            <span className={`text-gray-400 flex items-center font-bold ${visible ? 'visible' : 'invisible'}`}>
                {Array(dots).fill('.').join('')}
            </span>
        </div>
    );
};

export default memo(BlinkingDots);
