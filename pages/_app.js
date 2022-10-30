import { useRouter } from "next/router";

import AppBar from "../components/AppBar";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      {router.pathname !== "/" && <AppBar />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
