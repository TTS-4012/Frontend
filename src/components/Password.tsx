import { ForwardedRef, InputHTMLAttributes, forwardRef, useState } from "react";

type PropsType = InputHTMLAttributes<HTMLInputElement> & {
   label: string;
};

const Password = forwardRef(
   (
      { label, ...inputProps }: PropsType,
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
                  className={"block w-full pr-10 focus:outline-none sm:text-sm rounded-md focus:ring-indigo-500 text-gray-700 focus:border-indigo-500 border-gray-300"}
                  ref={ref}
               />
            </div>
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
