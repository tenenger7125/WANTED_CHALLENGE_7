import { styled } from "styled-components";
import type { GetStaticPaths, GetStaticProps } from "next";

import { Meta } from "@/components";
import { files, mark } from "@/utils";

const Post = ({ metaData, markup }: PostProps) => {
  return (
    <>
      <Meta meta={metaData} />
      <SLayout dangerouslySetInnerHTML={markup} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const fileCount = files.count();

  const paths = Array.from({ length: fileCount }, (_, i) => ({
    params: {
      postId: i.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  if (!params || typeof params.postId !== "string") return { props: {} }; // ❗ 좀...

  const content = files.get(+params.postId) as string; // ❗ 하아.... 타입 단언 쓰기 싫다..
  const { metaData, markup } = await mark.parse(content);

  return {
    props: {
      metaData,
      markup,
    },
  };
};

const SLayout = styled.main`
  width: 768px;
  margin: 0 auto;
`;

export type PostProps = {
  metaData: {
    title: string;
    description: string;
    date: string;
    slug: string;
    imgURL: string;
    categories: string[];
    tags: string[];
  };
  markup: { __html: string };
};

export default Post;
