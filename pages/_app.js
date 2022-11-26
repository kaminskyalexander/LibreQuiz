import { useRouter } from "next/router";
import React from 'react';

import AppBar from "../components/AppBar";
import { AuthProvider, useAuth } from "../contexts/AuthContext"

import { db } from '../utils/firebase';
import { onSnapshot, addDoc, collection, doc, deleteDoc, query, getDoc } from "firebase/firestore";

import "../styles/globals.css";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { pink } from '@mui/material/colors';

const AppContent = ({ Component, pageProps }) => {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [currentCourse, setCurrentCourse] = React.useState(null);

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

  const theme = createTheme({
    palette: {
      primary: {
        main: pink[300],
      }
    },
  });


  React.useEffect(() => {
    (async () => {
      if (router.query.courseId) {
        const courseDoc = await getDoc(doc(db, "courses", router.query.courseId));
        setCurrentCourse(courseDoc.data().name);
      }
    }
    )();
  }, [router.query.courseId]);

  if (showContent) {
    return <ThemeProvider theme={theme}>
      {(() => {
        if (router.pathname !== "/home" && user !== null) {
          return <AppBar courseCode={currentCourse} />;
        }
        else if (user !== null) {
          return <AppBar courseCode="LibreQuiz" />;
        }
      })()}

      <Component {...pageProps} />
    </ThemeProvider>;
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
