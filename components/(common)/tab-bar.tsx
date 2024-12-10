"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-5 border-neutral-600 border-t px-5 py-3 *:text-white bg-neutral-800">
      <Link href="/" className="flex flex-col items-center gap-px">
        <span>홈</span>
      </Link>
      <Link href="/search" className="flex flex-col items-center gap-px">
        <span>검색</span>
      </Link>
      <Link href="/chat" className="flex flex-col items-center gap-px">
        <span>채팅</span>
      </Link>
      <Link href="/live" className="flex flex-col items-center gap-px">
        <span>쇼핑</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center gap-px">
        <span>프로필</span>
      </Link>
    </div>
  );
}
