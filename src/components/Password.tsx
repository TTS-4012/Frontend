import { ForwardedRef, InputHTMLAttributes, forwardRef, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

type PropsType = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string | undefined;
};

const Password = forwardRef(({ label, error, ...inputProps }: PropsType, ref: ForwardedRef<HTMLInputElement>) => {
  const [showpass, setshowpass] = useState(false);
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type={showpass ? "text" : "password"}
          {...inputProps}
          className={`block w-full rounded-md border-gray-300 pr-10 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm 
                  ${error ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"}`}
          aria-invalid={!!error}
          ref={ref}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      <p
        className="mt-2 text-sm text-red-600"
        id="email-error">
        {error}&nbsp;
      </p>
      <div className="relative m-2 flex items-start">
        <div className="flex h-5 items-center">
          <input
            checked={showpass}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            onChange={() => setshowpass(!showpass)}
          />
        </div>
        <label className="ml-3 text-sm font-medium text-gray-700">Show password</label>
      </div>
    </div>
  );
});

export default Password;
