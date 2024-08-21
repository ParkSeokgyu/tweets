import db from "@/lib/db"
import getSession from "@/lib/session"
import { notFound, redirect } from "next/navigation"

async function getUser() {
  const session = await getSession()
  if(session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    })
    if(user) {
      return user
    }
  }
  notFound(); // 오직 session이 id가 없을 때만 실행됨.
}


export default async function Profile() {
  const user = await getUser()
  const logOut = async () => {
    "use server";
    const session = await getSession()
    await session.destroy(); // 쿠키 없애기함수
    redirect("/")
  }
  return (
    <div>
      <h1>Welcome! {user?.username}!</h1>
      <form action={logOut}>
        <button>로그아웃</button>
      </form>
    </div>
  )
}