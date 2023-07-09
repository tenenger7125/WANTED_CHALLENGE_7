import { styled } from "styled-components";

export const SSrOnly = styled.div`
  overflow: hidden;
  position: absolute;
  clip: rect(0, 0, 0, 0);
  clip-path: polygon(0 0, 0 0, 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  white-space: nowrap;
`;

export const SBadge = styled.span`
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
