import { createContext, useContext, useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import { auth, provider, db} from '../utils/firebase';
import { signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import {setDoc, doc, addDoc, arrayUnion, updateDoc, getDoc} from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
  
    function signIn() {
        signInWithPopup(auth, provider).then((result) => {
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

    function signOutUser()
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
        setLoading(false);
      })
  
      return unsubscribe
    }, [])
  
    const value = {
      getUser,
      signIn,
      signOutUser
    }
  
    return (
      <AuthContext.Provider value={value}>
        { !loading && children }
      </AuthContext.Provider>
    )
  }