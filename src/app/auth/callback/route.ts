import { createClient } from "@/lib/supabase/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createClient();

    try {
      await supabase.auth.exchangeCodeForSession(code);
    } catch (error) {
      console.error("OAuth 콜백 처리 중 오류:", error);
      return NextResponse.redirect(`${requestUrl.origin}/?error=auth_failed`);
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}/`);
}
