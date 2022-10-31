import Typography from '@mui/material/Typography';
import styles from "../styles/teacher.module.css";
import { Button } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import QuestionTable from '../components/QuestionTable';
import { style } from '@mui/system';

const questions = [
  "What does (+ 2 2) evaluate to?",
  "define is an example of an ____",
  "Which of the following is a value?",
  "Racket is a ______ programming langugage"
];

export default function Teacher() {

  return <>
    <header className={styles.header}>
        <Typography variant="h2">
          Sept 27th - Lists
        </Typography>
        <div className={styles.button__container}>
          <Button className={styles.button} variant="outlined" startIcon={<UploadFileIcon />}>Upload Questions</Button>
          <Button className={styles.button} variant="contained">Start Session</Button>
        </div>
    </header>
    <QuestionTable questions={questions}></QuestionTable>
  </>;
}
