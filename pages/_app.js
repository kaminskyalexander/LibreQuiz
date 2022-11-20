import { useRouter } from "next/router";
import {useEffect, useState} from 'react';

import AppBar from "../components/AppBar";
import { AuthProvider, useAuth } from "../contexts/AuthContext"

import "../styles/globals.css";

const AppContent = ({Component, pageProps}) => {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const { getUser } = useAuth();

  useEffect(() => {
    if (getUser() === null && router.pathname !== "/")
    {
      router.push("/");
    }
    if(getUser() !== null && router.pathname === "/")
    {
      router.push("/home");
    }
    setAuthenticated(true);
  }, []);
  

  return <>
    {router.pathname !== "/" && authenticated && <AppBar />}
    <Component {...pageProps} />
  </>;
}


function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppContent Component={Component} pageProps={pageProps}/>
    </AuthProvider>
  );
}

export default MyApp;
