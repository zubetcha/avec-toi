"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Button } from "antd";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuthClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-50 bg-white shadow-sm">
      <div className="container mx-auto max-w-screen-xl px-6 sm:px-8 lg:px-12 2xl:px-16">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex-shrink-0">
              {/* 로고 이미지 - 실제 로고로 교체해주세요 */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-200">
                <span className="text-sm font-bold text-white">WI</span>
              </div>
            </Link>
            <Link
              href="/create"
              className="rounded-md px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50"
            >
              모바일 청첩장
            </Link>
          </div>

          <div className="flex items-center">
            <Button
              type="primary"
              onClick={handleAuthClick}
              className="text-gray-900 hover:bg-indigo-100 hover:text-gray-900"
            >
              {isLoggedIn ? "로그아웃" : "로그인"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
