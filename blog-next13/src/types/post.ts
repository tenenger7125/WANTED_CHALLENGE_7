export type Post = {
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
