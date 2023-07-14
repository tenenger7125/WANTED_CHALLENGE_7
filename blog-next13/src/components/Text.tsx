"use client";

import { styled } from "styled-components";

type TextProps = {
  as?: "li" | "a" | "div" | "span";
  fz?: number;
  $fz?: number;
  h?: "auto" | number;
  $h?: "auto" | number;
  line?: number;
  $line?: number;
  children: React.ReactNode;
};

const SText = styled.div<TextProps>`
  font-size: ${(props) => props.$fz}px;
  height: ${(props) => props.$h}px;
  ${(props) =>
    props.$line &&
    `
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${props.line};
    overflow: hidden;
    text-overflow: ellipsis;
    `}
`;

const Text = ({ children, h, fz, line, ...rest }: TextProps) => {
  return (
    <SText $h={h} $fz={fz} $line={line} {...rest}>
      {children}
    </SText>
  );
};

Text.defaultProps = {
  as: "div",
  fz: 16,
  h: "auto",
};

export default Text;
