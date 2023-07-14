import type { Metadata } from "next";

import StyledComponentsRegistry from "@/lib/registry";
import { Providers } from "@/components";

export const metadata: Metadata = {
  title: "이동규의 마크다운 블로그",
  description: "마크다운 파일을 HTML로 변환하고 JSX로 반환하여 화면에 렌더링합니다.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
