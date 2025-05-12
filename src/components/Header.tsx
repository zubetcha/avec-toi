"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuthClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-slate-50 shadow-sm">
      <div className="container mx-auto max-w-screen-xl px-6 sm:px-8 lg:px-12 2xl:px-16">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex-shrink-0">
              {/* 로고 이미지 - 실제 로고로 교체해주세요 */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500">
                <span className="text-sm font-bold text-white">WI</span>
              </div>
            </Link>
            <Link
              href="/create"
              className="rounded-md px-4 py-2 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-100"
            >
              모바일 청첩장
            </Link>
          </div>

          <div className="flex items-center">
            <button
              onClick={handleAuthClick}
              className="rounded-md border border-rose-300 px-4 py-2 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-100"
            >
              {isLoggedIn ? "로그아웃" : "로그인"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
