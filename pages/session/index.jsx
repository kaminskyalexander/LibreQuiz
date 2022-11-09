import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import styles from '../../styles/session.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Session() {
  return (
    <>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        className={styles.back__button}
      >
        Go Back
      </Button>
      <div className={styles.main__container}>
        <Typography variant="h1" align="center">
          Sept 27th - Lists
        </Typography>
        <Button className={styles.start__button} variant="contained">
          Start Quiz
        </Button>
      </div>
    </>
  );
}
