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
    <div className="max-w-2xl mx-auto p-5 flex flex-col gap-5">
      {tweets.map((tweet) => (
        <div key={tweet.id} className="bg-gray-50 shadow-lg rounded-lg overflow-hidden">
          <div className="bg-white p-5 flex flex-col gap-3 border-b border-gray-200">
            <div className="text-gray-800 text-lg">
              <ListTweet {...tweet} />
            </div>
            <div className="text-sm text-gray-500">
              {new Date(tweet.created_at).toLocaleDateString()}에 작성됨
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}