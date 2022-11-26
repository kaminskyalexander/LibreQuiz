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
import CheckIcon from '@mui/icons-material/Check';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PersonIcon from '@mui/icons-material/Person';
import BarGraph from '../../../../components/BarGraph';

import { db } from '../../../../utils/firebase';
import { onSnapshot, setDoc, addDoc, collection, doc, deleteDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";


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
    updateDoc(doc(db, "courses", router.query.courseId, "quizzes", router.query.quizId), {
      questionOrder: arrayRemove(id)
    })
  }

  function createQuestion(question, correctOptions, options) {
    addDoc(collection(db, "courses", router.query.courseId, "quizzes", router.query.quizId, "questions"),
      { question: question, options: options }).then(questionDoc => {
        setDoc(doc(db, "courses", router.query.courseId, "quizzes", router.query.quizId, "answers", questionDoc.id),
          { correctOptions: correctOptions });
        updateDoc(doc(db, "courses", router.query.courseId, "quizzes", router.query.quizId), {
          questionOrder: arrayUnion(questionDoc.id)
        });
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

function Session({ firstQuestion }) {
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
        sx={{ margin: 5 }}
        onClick={() => {
          updateDoc((doc(db, "courses", router.query.courseId)), {
            activeQuiz: null,
            activeQuestion: null,
            isPolling: false
          })
        }}
      >
        Go Back
      </Button>
      <Stack alignItems="center" spacing={4}>
        <Typography variant="h1" align="center">
          {quizName}
        </Typography>
        <Button
          variant="contained"
          sx={{ width: 120 }}
          onClick={() => {
            if (firstQuestion !== null) {
              updateDoc((doc(db, "courses", router.query.courseId)), {
                activeQuestion: firstQuestion,
                isPolling: true
              })
            }
          }}>
          Start Quiz
        </Button>
      </Stack>
    </Container>
  );
}

// ########################################################################################################

function Question({ questionOrder }) {
  const theme = useTheme();
  const router = useRouter();
  const [question, setQuestion] = React.useState("");
  const [questionId, setQuestionId] = React.useState("");
  const [options, setOptions] = React.useState(["", "", "", ""]);
  const [responseCount, setResponseCount] = React.useState([0, 0, 0, 0]);
  const [isPolling, setIsPolling] = React.useState(true);
  const [correctOptions, setCorrectOptions] = React.useState([false, false, false, false]);

  React.useEffect(() => {
    return onSnapshot(doc(db, "courses", router.query.courseId), (snapshot) => {
      (async () => {
        const snapshotQuestionId = snapshot.data().activeQuestion;
        setIsPolling(snapshot.data().isPolling);
        if (snapshotQuestionId === null) return;
        const questionDoc = await getDoc(doc(db, "courses", router.query.courseId, "quizzes", router.query.quizId, "questions", snapshotQuestionId));
        setQuestionId(snapshotQuestionId);
        setQuestion(questionDoc.data().question);
        setOptions(questionDoc.data().options);
        const answerDoc = await getDoc(doc(db, "courses", router.query.courseId, "quizzes", router.query.quizId, "answers", snapshotQuestionId));
        setCorrectOptions(answerDoc.data().correctOptions);
      })();
    });
  }, []);

  React.useEffect(() => {
    if (!questionId) return;
    return onSnapshot(collection(db, "courses", router.query.courseId, "quizzes", router.query.quizId, "submissions", questionId, "students"), (snapshot) => {
      const newResponseCount = [0, 0, 0, 0];
      snapshot.forEach((doc) => {
        const i = doc.data().response;
        newResponseCount[i]++;
      })
      setResponseCount(newResponseCount);
    })
  }, [questionId]);

  function handleSkip() {
    const i = questionOrder.findIndex((e) => e === questionId) + 1;
    updateDoc(doc(db, "courses", router.query.courseId),
      (i < questionOrder.length) ? {
        activeQuestion: questionOrder[i],
        isPolling: true
      } : {
        activeQuestion: null,
        activeQuiz: null,
        isPolling: false
      });
    setResponseCount([0, 0, 0, 0]);
  };

  function handlePrevious() {
    const i = questionOrder.findIndex((e) => e === questionId) - 1;
    updateDoc(doc(db, "courses", router.query.courseId), {
      activeQuestion: (i < 0) ? null : questionOrder[i],
      isPolling: false
    });
    setResponseCount([0, 0, 0, 0]);
  };

  function handleGrade() {
    updateDoc(doc(db, "courses", router.query.courseId), {
      isPolling: false
    });
  }

  const numSubmitted = responseCount.reduce((a, b) => a + b, 0);
  const pctSubmitted = [
    (responseCount[0] / numSubmitted) * 100,
    (responseCount[1] / numSubmitted) * 100,
    (responseCount[2] / numSubmitted) * 100,
    (responseCount[3] / numSubmitted) * 100
  ];

  return (<React.Fragment>
    <Container>
      <Typography variant="h2" align="center" sx={{ m: 6 }}>
        {question}
      </Typography>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        width={1}
        sx={{pb: 10}}
      >
        <Grid
          container
          spacing={"15vh"}
          style={{ maxWidth: '90%' }}
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
      {!isPolling &&
        <BarGraph
          data={[
            { label: "A", value: pctSubmitted[0], color: correctOptions[0] ? "success" : "error" },
            { label: "B", value: pctSubmitted[1], color: correctOptions[1] ? "success" : "error" },
            { label: "C", value: pctSubmitted[2], color: correctOptions[2] ? "success" : "error" },
            { label: "D", value: pctSubmitted[3], color: correctOptions[3] ? "success" : "error" }
          ]}
          labelVariant="h3"
          height={200}
          showValues
        /> || <Typography variant="h6" align="center" color="primary">
          <PersonIcon/> {numSubmitted} submitted
        </Typography>}
    </Container>
    <Grid justifyContent="center" align-items="center" position="absolute" top="85%" container>
      <BottomNavigation
        showLabels
        sx={{ width: '50vw' }}
        style={{ backgroundColor: theme.palette.primary.main }}
      >
        <BottomNavigationAction
          label="Previous"
          style={{ color: 'white' }}
          icon={<ArrowBackIcon style={{ color: 'white' }} />}
          onClick={handlePrevious}
        />
        <BottomNavigationAction
          label="Skip"
          style={{ color: 'white' }}
          icon={<SkipNextIcon style={{ color: 'white' }} />}
          onClick={handleSkip}
        />
        <BottomNavigationAction
          label="Grade"
          style={{ color: 'white' }}
          icon={<CheckIcon style={{ color: 'white' }} />}
          onClick={handleGrade}
        />
      </BottomNavigation>
    </Grid>
  </React.Fragment>
  );
}

// ########################################################################################################

export default function Quiz() {
  const router = useRouter();

  const [quizActive, setQuizActive] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = React.useState(null);
  const [questionOrder, setQuestionOrder] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "courses", router.query.courseId), (snapshot) => {
      setQuizActive(snapshot.data().activeQuiz === router.query.quizId);
      setCurrentQuestion(snapshot.data().activeQuestion);
      (async () => {
        const quizDoc = await getDoc(doc(db, "courses", router.query.courseId, "quizzes", router.query.quizId));
        setQuestionOrder(quizDoc.data().questionOrder);
      })();
    });
    return unsubscribe;
  }, []);

  if (quizActive && currentQuestion !== null) {
    return <Question questionOrder={questionOrder} />;
  } else if (quizActive) {
    return <Session firstQuestion={(questionOrder.length > 0 ? questionOrder[0] : null)} />
  } else {
    return <QuizEditor handleStartQuiz={() => {
      updateDoc(doc(db, "courses", router.query.courseId), {
        activeQuiz: router.query.quizId,
        activeQuestion: null,
        isPolling: false
      });
    }} />;
  }
}
