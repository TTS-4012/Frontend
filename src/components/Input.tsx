import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { InputHTMLAttributes } from "react";

type PropsType = InputHTMLAttributes<HTMLInputElement> & {
    label: string
    error: string | undefined
}

function Input({ label, error, ...inputProps }: PropsType) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <input
                    {...inputProps}
                    className={`block w-full pr-10 focus:outline-none sm:text-sm rounded-md 
                    ${error ? 
                        'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 
                        'focus:ring-indigo-500 text-gray-700 focus:border-indigo-500 border-gray-300'
                    }`}
                    aria-invalid={!!error}
                />
                {error && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon className="text-red-500" aria-hidden="true" />
                </div>}
            </div>
            {error && <p className="mt-2 text-sm text-red-600" id="email-error">
                {error}
            </p>}
        </div>
    );
}

export default Input;