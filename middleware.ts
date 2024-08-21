import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

// 인증되지 않은 사용자가 접근할 수 있는 URL을 정의
const publicOnlyUrls: Routes = { 
  "/": true,
  "/log-in": true,
  "/create-account": true,
}

export async function middleware(request: NextRequest) {
  // 현재 세션을 가져옴
  const session = await getSession();

  // 현재 요청 URL이 공개 URL에 해당하는지 확인
  const exists = publicOnlyUrls[request.nextUrl.pathname]

  if (!session.id) { // 로그아웃 상태인 경우
    if(!exists) { // 비공개 URL에 접근하려는 경우
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else { // 로그인 상태인 경우 
    if(exists) { // 공개 URL에 접근하려는 경우
      return NextResponse.redirect(new URL("/products", request.url));
    }
  }
} 

// middleware가 실행되어야 하는 페이지 지정
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

