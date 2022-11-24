import React from 'react';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import ListTable from '../../../../components/ListTable';
import CreateQuizQuestionDialog from '../../../../components/CreateQuizQuestionDialog';

import { db } from '../../../../utils/firebase';
import { onSnapshot, setDoc, addDoc, collection, doc, deleteDoc, getDoc } from "firebase/firestore";


export default function Quiz() {
  const router = useRouter();
  const [questions, setQuestions] = React.useState([]);
  const [createQuestionDialogOpen, setCreateQuestionDialogOpen] = React.useState(false);
  const [quizName, setQuizName] = React.useState();

  React.useEffect(() => {
    (async () => {
      const quizDoc = await getDoc(doc(db, "courses", router.query.courseId, "quizzes", router.query.quizId));
      setQuizName(quizDoc.data().name);
    })();
  }, []);

  const unsubscribe = onSnapshot(collection(db, "courses", router.query.courseId, "quizzes", router.query.quizId, "questions"), (snapshot) => {
    (async () => {
      let questionsTemp = [];
      snapshot.forEach((doc) => {
        questionsTemp.push({ id: doc.id, name: doc.data().question });
      })

      if (questionsTemp.length !== questions.length) {
        setQuestions(questionsTemp);
      }
    })();
  });

  function removeQuestion(id) {
    deleteDoc(doc(db, "courses", router.query.courseId, "quizzes", router.query.quizId, "questions", id));
    deleteDoc(doc(db, "courses", router.query.courseId, "quizzes", router.query.quizId, "answers", id));
    deleteDoc(doc(db, "courses", router.query.courseId, "quizzes", router.query.quizId, "submission", id));
  }

  function createQuestion(question, correctOptions, options) {
    addDoc(collection(db, "courses", router.query.courseId, "quizzes", router.query.quizId, "questions"),
      { question: question, options: options }).then(questionDoc => {
        setDoc(doc(db, "courses", router.query.courseId, "quizzes", router.query.quizId, "answers", questionDoc.id),
          { correctOptions: correctOptions });
      });
  }

  

  return (<>
    <Container>
      <Stack direction="row" justifyContent="space-between" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1">Questions for {quizName}</Typography>
        <Stack direction="row" spacing={4}>
          <Button
            variant="contained"
            onClick={() => { setCreateQuestionDialogOpen(true); }}
          >
            Create Question
          </Button>
        </Stack>
      </Stack>
      <ListTable
        title={"Question"}
        items={questions}
        handleRemove={removeQuestion}
      />
    </Container>
    <CreateQuizQuestionDialog
      open={createQuestionDialogOpen}
      setOpen={setCreateQuestionDialogOpen}
      createQuizQuestion={createQuestion}
    />
  </>
  );
}