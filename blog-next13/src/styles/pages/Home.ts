"use client";

import { styled } from "styled-components";

export const SLayout = styled.main`
  display: flex;
  flex-flow: row wrap;
`;

export const SArticle = styled.article`
  width: 20rem;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  margin: 1rem;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.white[0]};
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;

  &:hover {
    transform: translateY(-8px);
    box-shadow: rgba(0, 0, 0, 0.08) 0px 12px 20px 0px;
  }
`;

export const SInfoContainer = styled.div`
  padding: 1rem;
`;

export const SCategories = styled.div`
  display: flex;
  gap: 5px;
  font-weight: 700;
`;
