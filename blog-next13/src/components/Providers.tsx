"use client";

import { ThemeProvider } from "styled-components";
import { GlobalStyle, defaultTheme } from "@/styles";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Providers;
