"use client";

import { Modal, Button, message } from "antd";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const supabase = useSupabaseClient();

  const handleModalClose = () => {
    onClose();
  };

  const handleKakaoLogin = async () => {
    try {
      message.loading({ content: "카카오 로그인 중...", key: "kakao-login" });

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }

      // OAuth 리다이렉트가 성공적으로 시작되면
      message.destroy("kakao-login");

      // 실제 로그인 성공은 auth state change에서 처리되므로
      // 여기서는 모달만 닫음
      handleModalClose();
    } catch (error) {
      console.error("카카오 로그인 실패:", error);
      message.destroy("kakao-login");
      message.error("카카오 로그인에 실패했습니다.");
    }
  };

  return (
    <Modal
      title={null}
      open={isOpen}
      onCancel={handleModalClose}
      footer={null}
      width={400}
      centered
    >
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">환영합니다</h2>
        <p className="text-gray-600">카카오 계정으로 간편하게 로그인하세요</p>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          onClick={handleKakaoLogin}
          size="large"
          block
          className="flex h-12 items-center justify-center gap-3 border-yellow-300 bg-yellow-300 font-medium text-black hover:border-yellow-400 hover:bg-yellow-400"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-black"
          >
            <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z" />
          </svg>
          카카오로 시작하기
        </Button>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            로그인 시 개인정보처리방침 및 서비스 이용약관에 동의하게 됩니다
          </p>
        </div>
      </div>
    </Modal>
  );
}
