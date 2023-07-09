import { styled } from "styled-components";

type TextProps = {
  as?: "li" | "a" | "div" | "span";
  fz?: number;
  h?: "auto" | number;
  line?: number;
  children: React.ReactNode;
};

const SText = styled.div<TextProps>`
  font-size: ${(props) => props.fz}px;
  height: ${(props) => props.h}px;
  ${(props) =>
    props.line &&
    `
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${props.line};
    overflow: hidden;
    text-overflow: ellipsis;
    `}
`;

const Text = ({ children, ...rest }: TextProps) => {
  return <SText {...rest}>{children}</SText>;
};

Text.defaultProps = {
  as: "div",
  fz: 16,
  h: "auto",
};

export default Text;
