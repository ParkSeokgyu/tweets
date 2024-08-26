async function getTweets() {
  await new Promise((resolve) => setTimeout(resolve, 10000));
}
  



export default async function Tweets() {
  const tweets = await getTweets()
  return (
    <div className="p-5 flex flex-col gap-5">
      Tweets!
    </div>
  );
}