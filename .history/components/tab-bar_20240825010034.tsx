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
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-4 border-gray-600 border-t px-5 py-5 text-gray-500">

      <Link href="/products" className="flex flex-col items-center gap-px">
        {pathname === "/products" 
          ? (<SolidHomeIcon className="w-7 h-7" />) 
          : (<OutlineHomeIcon className="w-7 h-7" />)
        }
      </Link>

      <button onClick={() => router.back()} className="flex flex-col items-center gap-px">
        <SolidChevronLeftIcon className="w-7 h-7" />
      </button>

      <button onClick={() => router.forward()} className="flex flex-col items-center gap-px">
        <SolidChevronRightIcon className="w-7 h-7" />
      </button>

      <Link href="/profile" className="flex flex-col items-center gap-px">
        {pathname === "/profile" 
          ? (<SolidUserIcon className="w-7 h-7" />) 
          : (<OutlineUserIcon className="w-7 h-7" />)
          }
      </Link>
    </div>
  );
}