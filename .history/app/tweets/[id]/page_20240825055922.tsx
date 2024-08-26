import db from "@/lib/db";
import { notFound } from "next/navigation";

// 3. 제품 ID를 이용해 데이터베이스에서 해당 제품을 가져오는 함수 작성
async function getTweet(id:number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
  })
  return tweet // 찾은 tweet 정보를 반환.
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id); // 1. 가져온 ID를 숫자로 변환
  if (isNaN(id)) {
    return notFound(); // 2. ID가 유효한 숫자가 아니면 404 에러 페이지 반환
  }

  const tweet = await getTweet(id); // 2. ID를 이용해 제품 정보 가져옴
  if (!tweet) {
    return notFound(); // 4. tweet을 찾을 수 없으면 404 에러 페이지 반환
  }

  return <span>tweet 상세정보 _ {id}</span>;
}