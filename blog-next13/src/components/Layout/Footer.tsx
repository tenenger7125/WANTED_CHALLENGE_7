'use client'

import { styled } from "styled-components";

const Footer = () => {
  return (
    <SFooter>
      <p>ⓒ 2023 Copy Right Reserved by LEE_DONG_GYU</p>
    </SFooter>
  );
};

const SFooter = styled.footer`
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Footer;
