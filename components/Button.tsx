import { ButtonHTMLAttributes } from 'react';

function Button<T extends ButtonHTMLAttributes<HTMLButtonElement>>({ children, className, ...props }: T) {
    return (
        <button
            className={`${className} flex items-center p-2 border mb-3 text-sm border-gray-600 rounded-md hover:bg-gray-500/20`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
