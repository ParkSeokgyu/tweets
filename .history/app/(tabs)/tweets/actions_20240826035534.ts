"use server";

import db from "@/lib/db";

// 1-1. 더 많은 상품을 가져오는 서버 함수 정의
export async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      tweet: true,
      created_at: true,
      id: true,
    },
    skip: page * 1, // 1-2. 이전에 가져온 상품을 제외하고 다음 상품을 가져옴
    take: 1, // 1-3. 한 번에 가져올 상품의 수를 지정
    orderBy: {
      created_at: "desc", // 1-4. 최신 상품부터 정렬하여 가져옴
    },
  });
  return tweets; // 1-5. 가져온 상품을 반환
}