import { ReactNode } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors?: string[];
  name: string;
  icon: ReactNode;
}    

export default function Input({type, placeholder, required, errors=[], name}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        className="
          bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 px-3"
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
      />  

      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  )
}