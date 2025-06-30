import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    try {
      await (supabase.auth as any).exchangeCodeForSession(code);
    } catch (error) {
      console.error("OAuth 콜백 처리 중 오류:", error);
      return NextResponse.redirect(`${requestUrl.origin}/?error=auth_failed`);
    }
  }

  // 로그인 성공 후 메인 페이지로 리다이렉트
  return NextResponse.redirect(`${requestUrl.origin}/`);
}
