import db from "@/lib/db";
import getSession from "@/lib/session";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";

// 6. 현재 세션 사용자가 제품의 소유자인지 확인하는 함수 작성
async function getIsOwner(userId: number) {
  const session = await getSession(); // 현재 세션 정보를 가져옴
  if (session.id) {
    return session.id === userId; // 세션 ID와 사용자 ID가 일치하는지 확인하여 소유자인지 여부를 반환
  }
  return false; // 세션 ID가 없거나 일치하지 않으면 false 반환
}

// 3. 제품 ID를 이용해 데이터베이스에서 해당 제품을 가져오는 함수 작성
async function getTweet(id:number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true, // 제품 소유자의 사용자 이름 선택
          avatar: true, // 제품 소유자의 아바타 선택
        },
      },
    },
  })
  console.log(tweet)
  return tweet // 찾은 tweet 정보를 반환.
}

// 0. tweet 상세 페이지를 위한 메인 컴포넌트 작성
export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id); // 1. 가져온 ID를 숫자로 변환
  if (isNaN(id)) {
    return notFound(); // 2. ID가 유효한 숫자가 아니면 404 에러 페이지 반환
  }

  const tweet = await getTweet(id); // 2. ID를 이용해 제품 정보 가져옴
  if (!tweet) {
    return notFound(); // 4. tweet을 찾을 수 없으면 404 에러 페이지 반환 또는 다른 페이지로 redirect 시킬 수 있음.
  }

  const isOwner = await getIsOwner(tweet.userId); // 5. 현재 사용자가 제품의 소유자인지 확인

  // 컴포넌트의 JSX를 반환하여 UI 구성 1
  // return (
  //   <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-2xl mx-auto mt-10">
  //     {/* 제품 소유자의 정보를 표시 */}
  //     <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-5 flex items-center gap-3 border-b border-neutral-300">
  //       <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
  //         {tweet.user.avatar !== null ? (
  //           <Image
  //             src={tweet.user.avatar}
  //             width={64}
  //             height={64}
  //             alt={tweet.user.username}
  //             className="object-cover"
  //           />
  //         ) : (
  //           <UserIcon className="text-white w-full h-full p-2" />
  //         )}
  //       </div>
  //       <div>
  //         <h3 className="font-bold text-white text-lg">{tweet.user.username}</h3>
  //       </div>
  //     </div>
  
  //     {/* 트윗 정보 표시 */}
  //     <div className="p-6">
  //       <p className="text-xl text-gray-800 mb-4">{tweet.tweet}</p>
  //       <p className="text-sm text-gray-500 mb-6">
  //         {tweet.created_at.toLocaleDateString()}에 작성됨
  //       </p>
  //     </div>
  
  //     {/* 소유자일 경우 삭제 버튼 표시 */}
  //     {isOwner && (
  //       <div className="p-5 flex justify-end border-t border-neutral-300">
  //         <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105">
  //           내글 삭제하기
  //         </button>
  //       </div>
  //     )}
  //   </div>
  // );


  // 컴포넌트의 JSX를 반환하여 UI 구성 2
  return (
    <div className="bg-gray-50 shadow-lg rounded-lg overflow-hidden max-w-2xl mx-auto mt-10">
      {/* 사용자 정보 섹션 */}
      <div className="bg-white p-5 flex items-center gap-4 border-b border-gray-200">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
          {tweet.user.avatar ? (
            <Image
              src={tweet.user.avatar}
              width={64}
              height={64}
              alt={tweet.user.username}
              className="object-cover"
            />
          ) : (
            <UserIcon className="text-gray-400 w-full h-full p-2" />
          )}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">{tweet.user.username}</h3>
          <p className="text-sm text-gray-500">{tweet.created_at.toLocaleDateString()}에 작성됨</p>
        </div>
      </div>
  
      {/* 트윗 정보 섹션 */}
      <div className="bg-white p-6">
        <p className="text-2xl text-gray-900 mb-4 leading-relaxed">{tweet.tweet}</p>
      </div>
  
      {/* 소유자일 경우 삭제 버튼 표시 */}
      {isOwner && (
        <div className="bg-gray-100 p-5 flex justify-end border-t border-gray-200">
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-8 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105">
            삭제
          </button>
        </div>
      )}
    </div>
  );
  
  
}