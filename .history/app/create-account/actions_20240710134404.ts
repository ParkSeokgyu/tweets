"use server";
import { PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import {z} from "zod"
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";


// 비밀번호 동인한지 검증하는 함수 리팰터링
const checkPasswords = ({ password, confirm_password } : { password:string, confirm_password:string }) => password === confirm_password

const formSchema = z.object({
  username: z
    .string()
    .toLowerCase() // 대문자 입력해도 소문자로 바꿔주기
    .trim(), // 앞튀 공백제거
  email: z
    .string()
    .email("유효하지 않은 이메일입니다.")
    .toLowerCase(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  confirm_password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR),
})
.superRefine(async({username}, ctx) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    }
  });
  if(user) {
    ctx.addIssue({
      code: 'custom',
      message: "이 사용자 이름은 이미 사용 중입니다.",
      path: ['username'], // 에러 주인 알려주기
      fatal: true,
    })
    return z.NEVER
  }
})
.superRefine(async({email}, ctx) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    }
  });
  if(user) {
    ctx.addIssue({
      code: 'custom',
      message: "해당 이메일에 이미 등록된 계정이 있습니다.",
      path: ['email'], // 에러 주인 알려주기
      fatal: true,
    })
    return z.NEVER
  }
})
.refine(checkPasswords, {
  message: "두 비밀번호는 모두 동일해야 합니다!",
  path: ["confirm_password"] // 에러 주인 알려주기
})

export async function createAccount (prevState:any, formData: FormData) { console.log(cookies())

  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = await formSchema.safeParseAsync(data); // await Async 추가(spa 라는 닉네임 써도됨.)
  console.log(result); //
  if (!result.success) { // 성공하지 못하면
    console.log(result.error.flatten()); // 에러메세지 보여줘
    return result.error.flatten();
  } else {
    console.log(result.data) // 성공한 데이터 보여줘
    // 3-1. 비밀번호 해싱하기
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    console.log(hashedPassword);
    // 4. 사용자를 데이터베이스에 저장
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    console.log(user)

    // 데이터베이스에 저장되면 사용자를 로그인 시켜줌.(profile페이지로 이동)
    const session = await getSession()
    session.id = user.id; 
    await session.save();

    redirect("/profile")
  }
}
