import { ForwardedRef, InputHTMLAttributes, forwardRef, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

type PropsType = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string | undefined;
};

const Password = forwardRef(
  (
    { label, error, ...inputProps }: PropsType,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [showpass, setshowpass] = useState(false);
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>

        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type={showpass ? "text" : "password"}
            {...inputProps}
            className={`block w-full pr-10 focus:outline-none sm:text-sm rounded-md focus:ring-indigo-500 text-gray-700 focus:border-indigo-500 border-gray-300 
                  ${
                    error
                      ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                      : "focus:ring-indigo-500 text-gray-700 focus:border-indigo-500 border-gray-300"
                  }`}
            aria-invalid={!!error}
            ref={ref}
          />
          {error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon
                className="text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error}&nbsp;
        </p>
        <div className="relative flex items-start m-2">
          <div className="flex items-center h-5">
            <input
              checked={showpass}
              type="checkbox"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              onChange={() => setshowpass(!showpass)}
            />
          </div>
          <label className="ml-3 text-sm font-medium text-gray-700">
            Show password
          </label>
        </div>
      </div>
    );
  }
);

export default Password;
