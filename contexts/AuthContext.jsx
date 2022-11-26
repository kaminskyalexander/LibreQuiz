import { createContext, useContext, useEffect, useState} from 'react'
import { useRouter } from 'next/router'

import { auth, provider, db} from '../utils/firebase';
import { signInWithRedirect, signOut, GoogleAuthProvider } from 'firebase/auth';
import {setDoc, doc, addDoc, arrayUnion, updateDoc, getDoc} from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
  
    function signIn() {
        signInWithRedirect(auth, provider).then((result) => {
          getDoc(doc(db, "users", result.user.uid)).then((knownUsers) => {
            if(knownUsers.exists()){
              updateDoc(doc(db, "users", result.user.uid), {
                name: result.user.displayName,
              });
            } else {
              setDoc(doc(db, "users", result.user.uid), {
                name: result.user.displayName,
                enrolledCourses: [],
                ownedCourses: []
              })
            }
            router.push("/home");
            const user = result.user;
            setCurrentUser(user);
          })
        }, (error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        })
    }

    function signOutInternal()
    {
      signOut(auth);
      router.push("/");
    }

    function getUser() {
      return auth.currentUser;
    }

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user);
        setIsLoading(false);
      })
  
      return unsubscribe
    }, [])
  
    const value = {
      user,
      isLoading,
      signIn,
      signOut: signOutInternal
    }
  
    return (
      <AuthContext.Provider value={value}>
        { !isLoading && children }
      </AuthContext.Provider>
    )
  }