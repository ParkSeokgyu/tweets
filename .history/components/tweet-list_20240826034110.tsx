"use client"

import { InitialTweets } from "@/app/(tabs)/tweets/page";
import ListTweet from "./list-tweet";
import { useEffect, useRef, useState } from "react";
import { getMoreTweets } from "@/app/(tabs)/tweets/actions";

interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetList({initialTweets}:TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const trigger = useRef<HTMLSpanElement>(null); // 스크롤 더보기
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newProducts = await getMoreTweets(page + 1);
          if (newProducts.length !== 0) {
            setPage((prev) => prev + 1);
            setTweets((prev) => [...prev, ...newProducts]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      {
        threshold: 1.0,
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page]);


  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {tweets.map((tweet) => (
        <div key={tweet.id} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
          <div className="p-6">
            <div className="text-xl font-semibold text-gray-900">
              <ListTweet {...tweet} />
            </div>
            <div className="mt-3 text-sm text-gray-500">
              {new Date(tweet.created_at).toLocaleDateString()}에 작성됨
            </div>
          </div>
        </div>
      ))}

      {/* 스크롤 더보기 */}
      {!isLastPage ? (
        <span
          ref={trigger}
          style={{
            marginTop: `${page + 1 * 900}vh`,
          }}
          className="mb-96 text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩 중" : "Load more"}
        </span>
      ) : null}
    </div>
  )
}


    