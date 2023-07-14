import { files, markdown } from "@/utils";
import { SLayout } from "@/styles/pages/Post";
import { Post } from "@/types/post";

const Post = async ({ params }: Params) => {
  const content = files.get(+params.postId) as string;
  const { markup } = (await markdown.parse(content)) as Post;

  return <SLayout dangerouslySetInnerHTML={markup} />;
};

export const generateStaticParams = async () => {
  return Array.from({ length: files.count() }, (_, i) => ({
    postId: i.toString(),
  }));
};

export const generateMetadata = async ({ params }: Params) => {
  const content = files.get(+params.postId) as string;
  const {
    metaData: { title, description },
  } = (await markdown.parse(content)) as Post;

  return {
    title,
    description,
  };
};

type Params = {
  params: {
    postId: number;
  };
};

export default Post;
