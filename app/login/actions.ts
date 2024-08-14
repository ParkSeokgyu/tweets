"use server"

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