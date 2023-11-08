import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from "react";

type PropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const Button = forwardRef(({ size, className, ...buttonProps }: PropsType, ref: ForwardedRef<HTMLButtonElement>) => {
    return (<button 
        className={`inline-flex items-center border border-transparent font-medium shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
        ${
            {
                xs: 'px-2.5 py-1.5 text-xs rounded',
                sm: 'px-3 py-2 text-sm rounded-md',
                md: 'px-4 py-2 text-sm rounded-md',
                lg: 'px-4 py-2 text-base rounded-md',
                xl: 'px-6 py-3 text-base rounded-md',
            }[size]
        } ${className}`}
        {...buttonProps} ref={ref}/>);
});

export default Button;