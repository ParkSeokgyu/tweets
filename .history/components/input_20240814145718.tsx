import { ReactNode } from "react";

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
  icon: ReactNode;
}

export default function Input({name, type, placeholder, required, errors, icon}: InputProps) {
  const hasErrors = errors.length > 0; // 수정: 에러 존재 여부 확인
  return (
    <div>
      <div className="relative flex items-center">
        <span className="absolute left-4">{icon}</span>
        <input
          className={`w-full rounded-full h-12 pl-12 border-2
            outline-none
            focus:border-gray-400 
            focus:ring-0 
            ${hasErrors ? 'outline-none border-red-500 ' : ''}
          `}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
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