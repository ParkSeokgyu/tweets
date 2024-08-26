"use client";

import {
  HomeIcon as SolidHomeIcon,
  ChevronLeftIcon as SolidChevronLeftIcon,
  ChevronRightIcon as SolidChevronRightIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname(); // 페이지 경로에 따라 아이콘 변경을 하기 위해 필요
  const router = useRouter(); // 뒤로가기 앞으로가기 기능을 사용하기 위해 필요

  return (
    <div className="fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-4 border-gray-600 border-t px-5 py-5 *:text-red-500">

      <Link href="/tweets" className="flex flex-col items-center">
        {pathname === "/tweets" 
          ? (<SolidHomeIcon className="w-7 h-7" />) 
          : (<OutlineHomeIcon className="w-7 h-7" />)
        }
      </Link>

      <button onClick={() => router.back()} className="flex flex-col items-center">
        <SolidChevronLeftIcon className="w-7 h-7" />
      </button>

      <button onClick={() => router.forward()} className="flex flex-col items-center">
        <SolidChevronRightIcon className="w-7 h-7" />
      </button>

      <Link href="/profile" className="flex flex-col items-center">
        {pathname === "/profile" 
          ? (<SolidUserIcon className="w-7 h-7" />) // 현재 경로이면
          : (<OutlineUserIcon className="w-7 h-7" />) // 현재 경로가 아니면
          }
      </Link>
    </div>
  );
}