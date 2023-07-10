import Head from "next/head";

const Meta = ({ meta }: MetaProps) => {
  const { title, description, slug, date, imgURL, deployURL } = { ...defaultMeta, ...meta };

  return (
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
      <meta property="og:url" content={deployURL} />

      <meta property="twitter:card" content="summary" />
      <meta property="twitter:site" content="donggyu" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imgURL} />
      <meta property="twitter:url" content={deployURL} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

type MetaProps = {
  meta?: {
    title: string;
    description: string;
    slug: string;
    date: string;
    imgURL: string;
    deployURL?: string;
  };
};

const defaultMeta = {
  title: "이동규의 마크다운 블로그",
  description: "마크다운 파일을 HTML로 변환하고 JSX로 반환하여 화면에 렌더링합니다.",
  slug: "markdown, html",
  date: "2023-07-10",
  imgURL: "https://via.placeholder.com/320x150",
  deployURL: "",
};

export default Meta;
