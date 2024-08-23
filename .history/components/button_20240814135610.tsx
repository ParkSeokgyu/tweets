"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}
export default function Button({ text }: ButtonProps) {

  const { pending } = useFormStatus(); // 로딩 중일 때는 버튼을 비활성화

  return (
    <button
      disabled={pending}
      className="h-12 disabled:bg-neutral-400 disabled:text-neutral-200 disabled:cursor-not-allowed w-full bg-gray-200 font-bold rounded-full hover:bg-gray-300 active:scale-90 transition-transform"
    >
      {pending ? "로딩중..." : text}
    </button>
  )
}


