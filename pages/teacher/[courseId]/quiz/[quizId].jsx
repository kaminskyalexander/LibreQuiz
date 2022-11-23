import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import ListTable from '../../../../components/ListTable';
import CreateQuizQuestionDialog from '../../../../components/CreateQuizQuestionDialog';

export default function Quiz() {
  let [questions, setQuestions] = React.useState([
    { id: 0, name: 'What does (+ 2 2) evaluate to?' },
    { id: 1, name: 'define is an example of an ____' },
    { id: 2, name: 'Which of the following is a value?' },
    { id: 3, name: 'Racket is a ______ programming langugage' },
  ]);

  function removeQuestion(id) {
    const newQuestions = quizzes.filter((question) => question.id !== id);
    setQuizzes(newQuestions);
  }

  function createQuestion(question, correctOptions, options) {

  }

  const [createQuestionDialogOpen, setCreateQuestionDialogOpen] = React.useState(false);

  return (<>
    <Container>
      <Stack direction="row" justifyContent="space-between" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1">Questions for #NAME</Typography>
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