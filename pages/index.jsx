import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Button from '@mui/material/Button';
import starIcon from '../public/img/star.svg';
import mockup from '../public/img/mockup.png';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';

export default function Home() {
  function signIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src={starIcon} alt="Star icon" />
        </div>
        <div className={styles.buttons}>
          <Button variant="contained" onClick={signIn}>
            Log In
          </Button>
        </div>
      </header>
      <main className={`${styles.main} container`}>
        <div>
          <h1 className={styles.title}>Lorem ipsum dolor sit amet</h1>
          <p className={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            vehicula ipsum tempor pulvinar suscipit. In hac habitasse platea
            dictumst. Quisque convallis commodo felis eget hendrerit.
          </p>
          <Button variant="contained">Get Started</Button>
        </div>
        <Image src={mockup} className={styles.mockup} />
      </main>
    </>
  );
}
