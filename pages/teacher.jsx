import {useState} from 'react';
import Typography from '@mui/material/Typography';
import styles from "../styles/teacher.module.css";
import { Button } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import QuestionTable from '../components/QuestionTable';


export default function Teacher() {
  
  let [questions, setQuestions] = useState([
    {id: 0, question: "What does (+ 2 2) evaluate to?"},
    {id: 1, question: "define is an example of an ____"},
    {id: 2, question: "Which of the following is a value?"},
    {id: 3, question: "Racket is a ______ programming langugage"}
  ]);
  

  function handleRemoveQuestion(id)
  {
    const newQuestions = questions.filter((question) => question.id !== id);
    setQuestions(newQuestions);
  }

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
    <QuestionTable  questions={questions} handleRemoveQuestion={handleRemoveQuestion}></QuestionTable>
  </>;
}
