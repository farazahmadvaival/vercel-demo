import type { AppProps } from "next/app";
import AppProvider from "../src/AppProvider";
import { Layout } from "../src/components/Layouts";
import "./../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
};

export default MyApp;
