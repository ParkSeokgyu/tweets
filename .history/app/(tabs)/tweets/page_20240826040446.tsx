import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

// 2-1. 초기 상품 목록을 가져오는 함수 정의
async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      tweet: true,
      created_at: true,
      id: true,
    },
    take: 2, // 2-2. 처음에 보여줄 상품 갯수 지정
    orderBy: {
      created_at: "desc", // 2-3. 최신 상품부터 정렬하여 가져옴
    },
  })
  console.log("데이터베이스연결확인", tweets)
  return tweets; // 2-4. 가져온 초기 상품 목록을 반환
}

export type InitialTweets = Prisma.PromiseReturnType<
  typeof getInitialTweets
>;

export default async function Tweets() {
  const initialTweets = await getInitialTweets() // 2-5. 초기 상품 목록을 가져옴
  return (
    <div>
      <TweetList initialTweets={initialTweets} /> {/* 2-6. 초기 상품 목록을 TweetList 컴포넌트에 전달 */}
    </div>
  );
}