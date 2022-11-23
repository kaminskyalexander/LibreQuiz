import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import ListTable from '../../../components/ListTable';
import CreateQuizDialog from '../../../components/CreateQuizDialog';

export default function Teacher() {
  let [quizzes, setQuizzes] = React.useState([
    { id: 0, name: 'Quiz 1' },
    { id: 1, name: 'Quiz 2' },
    { id: 2, name: 'Quiz 3' },
    { id: 3, name: 'Quiz 4' },
  ]);

  function removeQuiz(id) {
    const newQuestions = quizzes.filter((question) => question.id !== id);
    setQuizzes(newQuestions);
  }

  function createQuiz(name) {

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
