"use server"
import { PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import { z } from "zod";
import db from "@/lib/db";
import getSession from "@/lib/session";
import  bcrypt  from 'bcrypt';
import { redirect } from "next/navigation";

// 1. 이메일로 사용자 유무를 찾는다. + 에러 메시지 refine
const checkEmailExists = async(email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    }
  })
  return Boolean(user); // user가 존재한다면 true를 리턴
}

// 입력 데이터의 유효성을 검증하기 위한 Zod 스키마 정의
const formSchema = z.object({
  email: z
    .string()
    .email("유효하지 않은 이메일입니다.")
    .toLowerCase()
    .refine(checkEmailExists, "이 이메일을 사용하는 계정이 존재하지 않습니다."),
  password: z
    .string({
      required_error: "비밀번호를 입력해 주세요."
    })
    .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
})

export async function login(prevState: any, formData: FormData) {
  // 폼에서 제출된 데이터를 추출하여 유효성 검사를 위한 객체로 생성
  const data = { 
    email: formData.get("email"),     
    password: formData.get("password"), 
  }
  // 추출한 데이터를 Zod 스키마를 사용하여 유효성 검사.
  const result = await formSchema.safeParseAsync(data)
  console.log(result); // 테스트 출력

  // 결과가 성공이 아니면 에러를 사용자에게 리턴하고 성공하면 결과 콘솔에 출력
  if(!result.success) { 
    console.log(result.error.flatten()); // 테스트출력
    return result.error.flatten();
  } else {  // 성공하면 해야 하는 작업들
    console.log(result.data) // 성공 결과 콘솔에 출력

    // 2. 해시값을 확인해야 하기 때문에 이메일로 사용자를 다시 찾는다.
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      }
    })
    // 2-1. 비밀번호가 맞는지 확인(사용자가 찾아졌을 때만 비번의 해시값을 확인.)
    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? "xxxx"
    )
    
    // 3. 비밀번호의 해시값이 일치한다면 사용자를 로그인 시켜줌.
    // 4. 로그인하면 profile으로 redirect 시켜줌
    if(ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save(); // 로그인 상태 유지
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["비밀번호가 잘못되었습니다."],
          email: [],
        }
      }
    }
  }
}