import { ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";

import { GlobalStyle } from "@/styles/Global.style";
import { defaultTheme } from "@/styles/theme";
import Layout from "@/components/layout";

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
