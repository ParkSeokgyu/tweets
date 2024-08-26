async function getTweet() {
  await new Promise((resolve) => setTimeout(resolve, 60000)); // 시간 강제 지연 코드
}

export default async function TweetDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const tweet = await getTweet();
  return <span>tweet 상세정보 _ {id}</span>;
}