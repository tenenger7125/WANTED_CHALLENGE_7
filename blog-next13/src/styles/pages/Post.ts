"use client";

import { styled } from "styled-components";

export const SLayout = styled.main`
  line-height: 1.5;
  width: 768px;
  margin: 0 auto;

  img {
    max-width: 100%;
  }
  pre {
    background-color: ${(props) => props.theme.colors.gray[2]};
    padding: 10px;
  }
  code {
    background-color: ${(props) => props.theme.colors.gray[2]};
    padding: 3px 5px;
    border-radius: 5px;
  }
`;
