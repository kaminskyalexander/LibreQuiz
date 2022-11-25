import React from 'react';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import ListTable from '../../../../components/ListTable';
import CreateQuizQuestionDialog from '../../../../components/CreateQuizQuestionDialog';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CheckIcon from '@mui/icons-material/Check';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import { db } from '../../../../utils/firebase';
import { onSnapshot, setDoc, addDoc, collection, doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";


function QuizEditor({ handleStartQuiz }) {
  const router = useRouter();
  const [questions, setQuestions] = React.useState([]);
  const [createQuestionDialogOpen, setCreateQuestionDialogOpen] = React.useState(false);
  const [quizName, setQuizName] = React.useState();

  React.useEffect(() => {

    const unsubscribe = onSnapshot(collection(db, "courses", router.query.courseId, "quizzes", router.query.quizId, "questions"), (snapshot) => {
      let questionsTemp = [];
      snapshot.forEach((doc) => {
        questionsTemp.push({ id: doc.id, name: doc.data().question });
      })
      
      setQuestions(questionsTemp);
    });

    (async () => {
      const quizDoc = await getDoc(doc(db, "courses", router.query.courseId, "quizzes", router.query.quizId));
      setQuizName(quizDoc.data().name);
    })();

    return unsubscribe;
  }, []);

  

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
            variant="outlined"
            onClick={() => { setCreateQuestionDialogOpen(true); }}
          >
            Create Question
          </Button>
          <Button
            variant="contained"
            onClick={handleStartQuiz}
          >
            Start Quiz
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

// ########################################################################################################

function Session() {
  const router = useRouter();
  const [quizName, setQuizName] = React.useState();

  React.useEffect(() => {
    (async () => {
      const quizDoc = await getDoc(doc(db, "courses", router.query.courseId, "quizzes", router.query.quizId));
      setQuizName(quizDoc.data().name);
    })();
  }, [])
  
  return (
    <Container maxWidth={"90%"}>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        sx={{margin: 5}}
        onClick = {() => {
          updateDoc((doc(db, "courses", router.query.courseId)), {
            activeQuiz: null,
            activeQuestion: null
          })
        }}
      >
        Go Back
      </Button>
      <Stack alignItems="center" spacing={4}>
        <Typography variant="h1" align="center">
          {quizName}
        </Typography>
        <Button variant="contained" sx={{width: 120}}>
          Start Quiz
        </Button>
      </Stack>
    </Container>
  );
}

// ########################################################################################################

function Question() {
  const theme = useTheme();
  const router = useRouter();
  const [question, setQuestion] = React.useState();
  const [options, setOptions] = React.useState();

  React.useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "courses", router.query.courseId), (snapshot) => {
      (async () => {
        const questionId = snapshot.data().activeQuestion;
        const questionDoc = await getDoc(doc(db, "courses", router.query.courseId, "quizzes", router.query.quizId, "questions", questionId));
        setQuestion(questionDoc.data().question);
        setOptions(questionDoc.data().options);
      })();
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <Typography variant="h2" align="center" sx={{ m: 6 }}>
        {question}
      </Typography>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ minWidth: '100vw' }}
      >
        <Grid
          container
          spacing={"15vh"}
          style={{ maxWidth: '90vw'}}
        >
          <Grid item xs={6}>
            <Typography
              display="inline"
              variant="h4"
              color={theme.palette.primary.main}
            >
              A{' '}
            </Typography>
            <Typography display="inline" variant="h4">
              {options[0]}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              display="inline"
              variant="h4"
              color={theme.palette.primary.main}
            >
              C{' '}
            </Typography>
            <Typography display="inline" variant="h4">
            {options[2]}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              display="inline"
              variant="h4"
              color={theme.palette.primary.main}
            >
              B{' '}
            </Typography>
            <Typography display="inline" variant="h4">
            {options[1]}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              display="inline"
              variant="h4"
              color={theme.palette.primary.main}
            >
              D{' '}
            </Typography>
            <Typography display="inline" variant="h4">
              {options[3]}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid justifyContent="center" align-items="center" position="absolute" top="85%" container>
        <BottomNavigation
          showLabels
          sx={{ width: '50vw' }}
          style={{ backgroundColor: theme.palette.primary.main}}
        >
          <BottomNavigationAction
            label="Previous"
            style={{ color: 'white' }}
            icon={<ArrowBackIosIcon style={{ color: 'white' }} />}
          />
          <BottomNavigationAction
            label="Skip"
            style={{ color: 'white' }}
            icon={<SkipNextIcon style={{ color: 'white' }} />}
          />
          <BottomNavigationAction
            label="Grade"
            style={{ color: 'white' }}
            icon={<CheckIcon style={{ color: 'white' }} />}
          />
        </BottomNavigation>
      </Grid>
    </>
  );
}

// ########################################################################################################

export default function Quiz() {
  const router = useRouter();

  const [quizActive, setQuizActive] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = React.useState(null);

  const unsubscribe = onSnapshot(doc(db, "courses", router.query.courseId), (snapshot) => {
    setQuizActive(snapshot.data().activeQuiz === router.query.quizId);
    setCurrentQuestion(snapshot.data().activeQuestion);
  });

  if (quizActive && currentQuestion !== null) {
    return <Question/>
  } else if(quizActive) {
    return <Session/>
  } else {
    return <QuizEditor handleStartQuiz={() => {
      updateDoc(doc(db, "courses", router.query.courseId), {
        activeQuiz: router.query.quizId,
        activeQuestion: null
      });
    }} />;
  }
}
