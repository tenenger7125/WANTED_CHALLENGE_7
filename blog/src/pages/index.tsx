import Link from "next/link";
import Image from "next/image";
import { styled } from "styled-components";
import type { GetStaticProps } from "next";

import { Title, Text, Meta, Badge } from "@/components";
import { mark, files } from "@/utils";
import { PATH } from "@/constants/path";
import { SSrOnly } from "@/styles/common";
import type { PostProps } from "./posts/[postId]";

const Home = ({ posts }: HomeProps) => {
  return (
    <>
      <Meta />
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
                    <Badge key={tag}>{tag}</Badge>
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
  const contents = files.get() as string[]; // ❗ 타입 단언 쓰기 싫다.
  const posts = await mark.parser(contents);

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

type HomeProps = {
  posts: PostProps[];
};

export default Home;
