import React from 'react';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import ListTable from '../../../components/ListTable';
import CreateQuizDialog from '../../../components/CreateQuizDialog';

import { db } from '../../../utils/firebase';
import { onSnapshot, addDoc, collection, doc, deleteDoc } from "firebase/firestore";

export default function Teacher() {

  const router = useRouter();

  let [quizzes, setQuizzes] = React.useState([]);

  const unsubscribe = onSnapshot(collection(db, "courses", router.query.courseId, "quizzes"), (snapshot) => {
    (async () => {
      let quizzesTemp = [];
      snapshot.forEach((doc) => {
        quizzesTemp.push({ id: doc.id, name: doc.data().name });
      })

      if (quizzesTemp.length !== quizzes.length) {
        setQuizzes(quizzesTemp);
      }
    })();
  });

  function removeQuiz(id) {
    deleteDoc(doc(db, "courses", router.query.courseId, "quizzes", id));
  }

  function createQuiz(name) {
    addDoc(collection(db, "courses", router.query.courseId, "quizzes"), { name: name });
  }

  const [createQuizDialogOpen, setCreateQuizDialogOpen] = React.useState(false);

  return (<>
    <Container>
      <Stack direction="row" justifyContent="space-between" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1">My Quizzes</Typography>
        <Stack direction="row" spacing={4}>
          <Button
            variant="contained"
            onClick={() => { setCreateQuizDialogOpen(true); }}
          >
            Create Quiz
          </Button>
        </Stack>
      </Stack>
      <ListTable
        title={"Quiz"}
        items={quizzes}
        handleRemove={removeQuiz}
        handleClick={id => {router.push(router.query.courseId + "/quiz/" + id)}}
      />
    </Container>
    <CreateQuizDialog
      open={createQuizDialogOpen}
      setOpen={setCreateQuizDialogOpen}
      createQuiz={createQuiz}
    />
  </>
  );
}
