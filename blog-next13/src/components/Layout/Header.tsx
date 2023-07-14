"use client";

import Link from "next/link";
import { styled } from "styled-components";

import { PATH } from "@/constants/path";

const Header = () => {
  return (
    <SHeader>
      <SContainer>
        <Link href={PATH.HOME}>
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="100">
            <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="24" font-family="Arial">
              dongyu
            </text>
          </svg>
        </Link>
        <a href="https://github.com/tenenger7125">
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="100">
            <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-size="24" font-family="Arial">
              깃허브로 가기
            </text>
          </svg>
        </a>
      </SContainer>
    </SHeader>
  );
};

const SHeader = styled.header``;

const SContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Header;
