import Head from "next/head";
import type { GetStaticPaths, GetStaticProps } from "next";
import { styled } from "styled-components";
import { files } from "@/utils/files";
import { mark } from "@/utils/mark";

export type PostProps = {
  metaData: {
    title: string;
    description: string;
    date: string;
    slug: string;
    imgURL: string;
    categories: string[];
    tags: string[];
    // [index: string]: string | string[] | undefined;
  };
  markup: { __html: string };
};

const Post = ({ metaData: { title, description, date, categories, tags, slug, imgURL }, markup }: PostProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="Date" content={date} />
        <meta name="keyword" content={slug} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="donggyu" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imgURL} />
        <meta property="og:url" content="배포URL" />

        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="donggyu" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={imgURL} />
        <meta property="twitter:url" content="배포URL" />
      </Head>
      <SLayout>
        <main dangerouslySetInnerHTML={markup} />
      </SLayout>
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

  if (!params) return { props: {} };

  const content = files.get();
  const { metaData, markup } = (await mark.read(content))[0];

  return {
    props: {
      metaData,
      markup,
    },
  };
};

const SLayout = styled.div`
  width: 768px;
  margin: 0 auto;
`;

export default Post;
