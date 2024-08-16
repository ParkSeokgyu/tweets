"use server"

import { z } from "zod";

// 이메일 정규 표현식(필수 포함되어야 하는 문자)
export const EMAIL_REGEX = new RegExp(
  /^[^\s@]+@zod\.com$/
);

// 입력 데이터의 유효성을 검증하기 위한 Zod 스키마 정의
const formSchema = z.object({
  email: z
    .string()
    .email("유효하지 않은 이메일입니다.")
    .toLowerCase()
    .regex(EMAIL_REGEX, "zod.com 이메일만 허용됩니다."),
  username: z
    .string()
    .min(5, "사용자명은 5자 이상이어야 합니다.")
    .toLowerCase() // 대문자 입력해도 소문자로 바꿔주기
    .trim() // 앞뒤 공백제거
})

export async function login(prevState: any, formData: FormData) {
  console.log(prevState)
  await new Promise((resolve) => setTimeout(resolve, 3000)) // 시간 강제 지연 코드

  // 폼에서 제출된 데이터를 추출하여 유효성 검사를 위한 객체로 생성
  const data = { 
    email: formData.get("email"),     
    username: formData.get("username"), 
    password: formData.get("password"), 
  }
  // 추출한 데이터를 Zod 스키마를 사용하여 유효성 검사.
  const result = formSchema.safeParse(data)
  console.log(result); // 테스트 출력

  // 결과가 성공이 아니면 에러를 사용자에게 리턴하고 성공하면 결과 콘솔에 출력
  if(!result.success) { 
    console.log(result.error.flatten()); // 테스트출력
    return result.error.flatten();
  } else {
    console.log(result.data) // 성공 결과 콘솔에 출력
    return { success: true }; // 성공 시 success: true 반환
  }
}