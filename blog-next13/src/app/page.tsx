import Link from "next/link";
import Image from "next/image";

import { Badge, Text, Title } from "@/components";
import { files, markdown } from "@/utils";
import { PATH } from "@/constants/path";
import { SSrOnly } from "@/styles";
import { SArticle, SCategories, SInfoContainer, SLayout } from "@/styles/pages/Home";
import { Post } from "@/types/post";

const Home = async () => {
  const contents = files.get() as string[];
  const posts = (await markdown.parser(contents)) as Post[];

  return (
    <>
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

export default Home;
