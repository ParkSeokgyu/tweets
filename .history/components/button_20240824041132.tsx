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
      className="primary-btn"
    >
      {pending ? "로딩중..." : text}
    </button>
  )
}


