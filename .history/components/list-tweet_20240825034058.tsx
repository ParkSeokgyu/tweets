import Link from "next/link";

import { formatToTimeAgo} from "@/lib/utils";

interface ListTweetProps {
  tweet: string;
  created_at: Date;
  id: number;
}

export default function ListTweet({
  tweet,
  created_at,
  id,
}: ListTweetProps) {
  return (
    <Link href={`/tweets/${id}`} className="flex gap-5">
      <div className="flex flex-col gap-1">
        <div className="text-lg">{tweet}</div>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(created_at.toString())}
        </span>
      </div>
    </Link>
    
  );
}