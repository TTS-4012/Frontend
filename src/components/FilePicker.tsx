import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

type PropsType = InputHTMLAttributes<HTMLInputElement> & {
  error?: string | undefined;
};

const FilePicker = forwardRef(({ error, ...inputProps }: PropsType, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div>
      <div className="relative m-4 mt-1 rounded-md shadow-sm">
        <input
          {...inputProps}
          type="file"
          className={`block w-full rounded-md pr-10 focus:outline-none sm:text-sm 
                        ${error ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"}`}
          aria-invalid={!!error}
          ref={ref}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          </div>
        )}
      </div>
    </div>
  );
});
export default FilePicker;
