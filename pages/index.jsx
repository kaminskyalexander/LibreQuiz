import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Button from '@mui/material/Button';
import logo from '../public/img/star.svg';
import mockup from '../public/img/mockup.png';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { signIn } = useAuth();
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src={logo} alt="Star icon" />
        </div>
        <div className={styles.buttons}>
          <Button variant="contained" onClick={signIn}>
            Log In
          </Button>
        </div>
      </header>
      <main className={`${styles.main} container`}>
        <div>
          <h1 className={styles.title}>
            Increase student engagement and focus.
          </h1>
          <p className={styles.paragraph}>
            Set up your class in minutes and start creating quizzes to boost
            student participation using LibreQuiz.
          </p>
          <Button variant="contained">Get Started</Button>
        </div>
        <Image src={mockup} className={styles.mockup} />
      </main>
    </>
  );
}
