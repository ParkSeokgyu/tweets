"use client"

import { InitialTweets } from "@/app/(tabs)/tweets/page";
import ListTweet from "./list-tweet";
import { useEffect, useRef, useState } from "react";
import { getMoreTweets } from "@/app/(tabs)/tweets/actions";

interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetList({initialTweets}: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const trigger = useRef<HTMLSpanElement>(null); // 1. IntersectionObserver를 통해 감지할 요소를 참조하는 Ref 생성

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[], 
        observer: IntersectionObserver
      ) => {
        const element = entries[0]; // 2. 감지된 요소 중 첫 번째 요소 가져오기
        if (element.isIntersecting && trigger.current) { // 3. 요소가 화면에 보이는지 확인
          observer.unobserve(trigger.current); // 4. 중복 호출을 방지하기 위해 요소의 관찰 중지
          setIsLoading(true); // 5. 로딩 상태를 true로 설정
          
          const newTweets = await getMoreTweets(page + 1); // 6. 새로운 트윗 가져오기 (다음 페이지)
          if (newTweets.length !== 0) {
            setTweets((prev) => [...prev, ...newTweets]); // 8. 기존 트윗 리스트에 새로 가져온 트윗 추가
            setPage((prev) => prev + 1); // 7. 페이지 수 증가
          } else {
            setIsLastPage(true); // 9. 더 이상 가져올 트윗이 없으면 마지막 페이지로 설정
          }
          setIsLoading(false); // 10. 로딩 상태를 false로 설정
        }
      },
      {
        threshold: 1.0, // 11. 요소가 100% 화면에 나타날 때만 감지되도록 설정
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current); // 12. 요소 관찰 시작
    }
    return () => {
      observer.disconnect(); // 13. 컴포넌트가 언마운트될 때 옵저버 연결 해제
    };
  }, [page]); // 14. page 상태가 변경될 때마다 이 useEffect가 실행됨

  return (
    <div className="p-5 flex flex-col gap-5 w-full">
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
      {!isLastPage ? ( // 15. 더 이상 트윗이 없으면 스크롤 더보기를 표시하지 않음
        <span
          ref={trigger} // 16. 스크롤 더보기 요소를 감지할 수 있도록 Ref 연결
          className="mt-[300vh] mb-96 text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩 중" : "Load more"} {/* 18. 로딩 중에는 "로딩 중" 표시, 그렇지 않으면 "Load more" */}
        </span>
      ) : null}
    </div>
  )
}
