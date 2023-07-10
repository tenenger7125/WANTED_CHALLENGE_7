import { styled } from "styled-components";

const Badge = ({ children }: BadgeProps) => {
  return <SBadge>{children}</SBadge>;
};

const SBadge = styled.span`
  background: ${(props) => props.theme.colors.white[1]};
  padding: 0 5px;
  margin: 3px;
  height: 2rem;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  color: ${(props) => props.theme.colors.blue[4]};
  font-size: 12px;
`;

type BadgeProps = {
  children: React.ReactNode;
};

export default Badge;
