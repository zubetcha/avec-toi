import type { Metadata } from "next";
import { ConfigProvider } from "antd";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import Header from "@/components/Header";
import SupabaseProvider from "@/app/_provider/supabase-provider";
import AuthProvider from "@/app/_provider/auth-provider";
import QueryClientProvider from "@/app/_provider/query-client-provider";

const suit = localFont({
  src: "../../public/fonts/SUIT-Variable.woff2",
  display: "swap",
  variable: "--font-suit",
});

export const metadata: Metadata = {
  title: "모바일 청첩장",
  description: "모바일 청첩장 웹사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
          strategy="beforeInteractive"
        />
        <link
          href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${suit.variable} bg-slate-50`}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#7c86ff",
            },
          }}
        >
          <QueryClientProvider>
            <SupabaseProvider>
              <AuthProvider>
                <Header />
                <main className="bg-slate-50 pt-16">{children}</main>
              </AuthProvider>
            </SupabaseProvider>
          </QueryClientProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
