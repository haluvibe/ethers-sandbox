import React from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "../material-ui/create.theme";
import { AppProps } from "next/app";
// import { startMirageServer } from '../../mirage'
import { SWRConfig } from "swr";
import { fetcher } from "../utils/swr";
import dynamic from "next/dynamic";

// export let server
if (process.env.NEXT_PUBLIC_USE_MIRAGE_SERVER === "true") {
  // console.log('ATTENTION - Using mirage server')
  // startMirageServer()
}

const App: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SWRConfig
          value={{
            refreshInterval: 3000,
            fetcher,
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
