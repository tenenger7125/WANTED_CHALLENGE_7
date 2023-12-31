import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Plugin } from "unified";
import { Root } from "mdast";

const defaultMetaData = {
  imgURL: "https://via.placeholder.com/320x150",
};

const markdown = {
  async parse(content: string) {
    const { content: markdown, data: metaData } = matter(content);
    const { value } = await remark()
      .use(html as Plugin<[], Root, string>)
      .process(markdown);

    return {
      metaData: { ...defaultMetaData, ...metaData },
      markup: { __html: String(value) },
    };
  },
  async parser(contents: string[]) {
    if (Array.isArray(contents)) {
      const promises = contents.map(this.parse);
      const posts = await Promise.all(promises);
      return posts;
    }

    return await this.parse(contents);
  },
};

export default markdown;
