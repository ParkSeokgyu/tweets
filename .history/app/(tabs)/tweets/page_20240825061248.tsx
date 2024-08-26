import ListTweet from "@/components/list-tweet";
import db from "@/lib/db";

async function getTweets() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 시간지연코드
  const tweets = await db.tweet.findMany({
    select: {
      tweet: true,
      created_at: true,
      id: true,
    }
  })
  console.log("데이터베이스연결확인", tweets)
  return tweets;
}


export default async function Tweets() {
  const tweets = await getTweets()
  return (
    <div className="p-5 flex flex-col gap-5">
      {tweets.map((tweet) => (
        <ListTweet key={tweet.id} {...tweet} />
      ))}
    </div>
  );
}