import styled from "styled-components";

type TitleProps = {
  order: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode | string;
  line?: number;
  $line?: number;
};

const STitle = styled.div<Partial<TitleProps>>`
  margin: 10px 0;
  font-weight: 700;

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

const Title = ({ order, line, children }: TitleProps) => {
  const TitleOrder: keyof JSX.IntrinsicElements = `h${order}`;
  return (
    <STitle as={TitleOrder} $line={line}>
      {children}
    </STitle>
  );
};

Title.defaultProps = {
  order: 2,
};

export default Title;
