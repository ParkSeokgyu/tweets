import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps {
  name: string;
  errors?: string[];
  icon: ReactNode;
}

export default function Input({
  name, 
  errors=[], 
  icon,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  const hasErrors = errors.length > 0; // 에러 존재 여부 확인
  return (
    <div>
      <div className="relative flex items-center">
        <span className="absolute left-4">{icon}</span>
        <input
          className={`w-full rounded-full h-12 pl-12 border-2
            outline-none
            ring 
            focus:ring-gray-400 
            focus:ring-offset-2 
            ring-transparent
            ${hasErrors ? 'outline-none border-red-500 focus:ring-red-500 ' : 'ring-transparent'}
          `}
          name={name}
          {...rest}
        />
      </div>
      {errors.map((error, index) => (
        <div key={index} className="text-red-500 font-medium mt-2">
          {error}
        </div>
      ))}
    </div>
  )
}