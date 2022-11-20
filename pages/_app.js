import { useRouter } from "next/router";

import AppBar from "../components/AppBar";
import { AuthProvider } from "../contexts/AuthContext"

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();



  return (
    <AuthProvider>
      {router.pathname !== "/" && <AppBar />}
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
