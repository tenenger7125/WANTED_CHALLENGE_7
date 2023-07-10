import { ThemeProvider } from "styled-components";
import typescript from "highlight.js/lib/languages/typescript";
import hljs from "highlight.js/lib/core";
import type { AppProps } from "next/app";

import { Layout } from "@/components";
import { GlobalStyle, defaultTheme } from "@/styles";
import "highlight.js/styles/github-dark.css";

hljs.registerLanguage("typescript", typescript);

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
