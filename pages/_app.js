import { useRouter } from "next/router";
import React from 'react';

import AppBar from "../components/AppBar";
import { AuthProvider, useAuth } from "../contexts/AuthContext"

import "../styles/globals.css";

const AppContent = ({ Component, pageProps }) => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  React.useEffect(() => {
    if (user === null && router.pathname !== "/") {
      router.push("/");
    }
    if (user !== null && router.pathname === "/") {
      router.push("/home");
    }
  }, [user, isLoading]);

  const showContent = (
    (user === null && router.pathname === "/") ||
    (user !== null && router.pathname !== "/")
  );

  if (showContent) {
    return <>
      {router.pathname !== "/" && user !== null && <AppBar />}
      <Component {...pageProps} />
    </>;
  }
  return <></>;
}


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppContent Component={Component} pageProps={pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
