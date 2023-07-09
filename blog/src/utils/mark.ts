import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export const mark = {
  async read(data: string[] | string) {
    const contents = Array.isArray(data) ? data : [data];
    const promises = contents.map(async (content) => {
      const { content: markdown, data: metaData } = matter(content);
      const { value } = await remark().use(html).process(markdown);

      return {
        metaData: { ...metaData, imgURL: metaData.imgURL || "https://via.placeholder.com/320x150" },
        markup: { __html: String(value) },
      };
    });

    const posts = await Promise.all(promises);
    return posts;
  },
};
