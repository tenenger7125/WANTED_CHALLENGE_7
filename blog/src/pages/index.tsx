import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { styled } from "styled-components";
import type { GetStaticProps } from "next";

import { mark } from "@/utils/mark";
import { files } from "@/utils/files";
import { PATH } from "@/constants/path";
import Title from "@/components/Title";
import Text from "@/components/Text";
import { SSrOnly, SBadge } from "@/styles/common";
import type { PostProps } from "./posts/[postId]";
import { Reset } from "styled-reset";

type HomeProps = {
  posts: PostProps[];
};

const Home = ({ posts }: HomeProps) => {
  return (
    <>
      {/* <Reset /> */}
      <Head>
        <title>마크다운 블로그</title>
        <meta name="description" content="마크다운 파일을 HTML로 변환하고 JSX로 반환하여 화면에 렌더링합니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SLayout>
        {posts.map(({ metaData: { categories, date, description, slug, tags, title, imgURL } }, idx) => (
          <SArticle key={idx}>
            <Link href={`${PATH.POSTS}/${idx}`}>
              <Image src={imgURL} alt="thumbnail" width={320} height={150} priority={true} />
              <SInfoContainer>
                <Title line={1}>{title}</Title>
                <Text line={4} h={63} fz={14}>
                  {description}
                </Text>
                <Text fz={12}>{date}</Text>
                <SCategories>
                  {categories.map((category) => (
                    <Text fz={12} key={category}>
                      {category}
                    </Text>
                  ))}
                </SCategories>
                <div>
                  {tags.map((tag) => (
                    <SBadge key={tag}>{tag}</SBadge>
                  ))}
                </div>
              </SInfoContainer>
              <SSrOnly>{slug}</SSrOnly>
            </Link>
          </SArticle>
        ))}
      </SLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const contents = files.get();
  const posts = await mark.read(contents);

  return {
    props: {
      posts,
    },
  };
};

const SLayout = styled.main`
  display: flex;
  flex-flow: row wrap;
`;

const SArticle = styled.article`
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

const SInfoContainer = styled.div`
  padding: 1rem;
`;

const SCategories = styled.div`
  display: flex;
  gap: 5px;
  font-weight: 700;
`;

export default Home;
