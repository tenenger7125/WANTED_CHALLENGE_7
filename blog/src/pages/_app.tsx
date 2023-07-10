import { ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";

import { Layout } from "@/components";
import { GlobalStyle, defaultTheme } from "@/styles";

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
