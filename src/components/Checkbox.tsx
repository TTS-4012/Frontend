import { ForwardedRef, forwardRef } from "react";

type PropsType = {
  label: string;
  value: boolean;
  onToggle: (newValue: boolean) => unknown;
  className?: string;
};

const Checkbox = forwardRef(({ label, value, onToggle, className }: PropsType, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div className={`flex items-start ${className}`}>
      <div className="flex h-5 items-center">
        <input
          checked={value}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          onChange={() => onToggle?.(!value)}
          ref={ref}
        />
      </div>
      <label className="ml-3 text-sm font-medium text-gray-700">{label}</label>
    </div>
  );
});

export default Checkbox;
