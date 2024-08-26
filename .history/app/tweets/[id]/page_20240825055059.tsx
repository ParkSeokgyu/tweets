import { notFound } from "next/navigation";

async function getTweet(id:number) {
  await new Promise((resolve) => setTimeout(resolve, 60000)); // 시간 강제 지연 코드
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
  // const tweet = await getTweet(id); // 2. ID를 이용해 제품 정보 가져옴
  // if (!tweet) {
  //   return notFound(); // 3. 제품을 찾을 수 없으면 404 에러 페이지 반환
  // }

  return <span>tweet 상세정보 _ {id}</span>;
}