"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import { Button, message } from "antd";
import { createClient } from "@/lib/supabase/supabase-client";
import { useAuth } from "../hooks/useAuth";

const LoginModal = dynamic(() => import("./LoginModal"), { ssr: false });

const supabase = createClient();

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, isAuthenticated, userName } = useAuth();

  const previousAuthState = useRef(false);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      handleLogout();
    } else {
      setIsModalOpen(true);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await (supabase.auth as any).signOut();
      if (error) throw error;

      message.success("로그아웃되었습니다.");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      message.error("로그아웃에 실패했습니다.");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // 로그인 성공 시 성공 메시지 표시 (중복 방지)
  useEffect(() => {
    if (isAuthenticated && !previousAuthState.current && user) {
      message.success("카카오 로그인이 완료되었습니다.");
    }
    previousAuthState.current = isAuthenticated;
  }, [isAuthenticated, user]);

  return (
    <>
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

            <div className="flex items-center gap-4">
              {isAuthenticated && userName && (
                <span className="text-sm text-gray-600">{userName}님 환영합니다</span>
              )}
              <Button
                type="primary"
                onClick={handleAuthClick}
                className="text-gray-900 hover:bg-indigo-100 hover:text-gray-900"
              >
                {isAuthenticated ? "로그아웃" : "로그인"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <LoginModal isOpen={isModalOpen} onCloseAction={handleModalClose} />
    </>
  );
}
