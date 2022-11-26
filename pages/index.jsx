import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import QuizIcon from '@mui/icons-material/Quiz';
import mockup from '../public/img/mockup.png';
import { useAuth } from '../contexts/AuthContext';
import { Typography } from '@mui/material';

export default function Home() {
  const { signIn } = useAuth();
  return (
    <>
      <header className={styles.header}>
        <Stack direction="row" spacing={2}>
          <QuizIcon sx={{fontSize: 42}}/>
          <Typography variant="h4" component="h1">
            LibreQuiz
          </Typography>
        </Stack>
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
          <Button variant="contained" onClick={signIn}>Get Started</Button>
        </div>
        <Image src={mockup} className={styles.mockup} />
      </main>
    </>
  );
}
