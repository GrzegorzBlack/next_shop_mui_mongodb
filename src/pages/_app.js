import Providers from "../components/Providers";
import "@/styles/globals.css";

import Layout from "../components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <Providers>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
}
