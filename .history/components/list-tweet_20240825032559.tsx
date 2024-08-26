import Image from "next/image";
import Link from "next/link";

import { formatToTimeAgo} from "@/lib/utils";

interface ListTweetProps {
  tweet: string;
  created_at: Date;
  id: number;
}

export default function ListTweet({
  tweet,
  id,
}: ListTweetProps) {
  return (
    <Link href={`/tweets/${id}`} className="flex gap-5">
      {/* <div className="relative size-28 rounded-md overflow-hidden">
        <Image fill src={photo} alt={title} />
      </div> */}
      <div className="flex flex-col gap-1">
        <span className="text-lg">{tweet}</span>
        <span className="text-sm text-neutral-500">
          {formatToTimeAgo(created_at.toString())}
        </span>
      </div>
    </Link>
    
  );
}