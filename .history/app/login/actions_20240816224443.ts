"use server"

import { z } from "zod";

// 입력 데이터의 유효성을 검증하기 위한 Zod 스키마 정의
const formSchema = z.object({
  email: z
    .string()
    .email("zod.com 이메일만 허용됩니다.").toLowerCase(),
  username: z
    .string()
    .min(5, "사용자명은 5자 이상이어야 합니다.")
    .toLowerCase() // 대문자 입력해도 소문자로 바꿔주기
    .trim() // 앞뒤 공백제거
})

export async function login(prevState: any, formData: FormData) {
  console.log(prevState)
  await new Promise((resolve) => setTimeout(resolve, 3000)) // 시간 강제 지연 코드

  const password = formData.get('password') as string;

  // 수정: 비밀번호 검증 로직 추가
  if (password === '12345') {
    return {
      success: true,
      errors: []
    }
  } else {
    return {
      success: false,
      errors: ["Wrong password"]
    }
  }
}