import AttendanceCalendar from "../../../components/AttendanceCalendar"
import CircularPercentProgress from "../../../components/CircularPercentProgress"
import GradeTimeline from '../../../components/GradeTimeline'
import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Container from '@mui/material/Container';
import QuizIcon from '@mui/icons-material/Quiz';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import InsightsIcon from '@mui/icons-material/Insights';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import InfoIcon from '@mui/icons-material/Info';
import Stack from '@mui/material/Stack';

import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../utils/firebase';
import { onSnapshot, doc, setDoc, getDoc } from "firebase/firestore";

const attendanceData = {
  "2022-10-27": { attended: true },
  "2022-11-01": { attended: true },
  "2022-11-03": { attended: true },
  "2022-11-08": { attended: true },
  "2022-11-10": { attended: false },
  "2022-11-15": { attended: false },
  "2022-11-17": { attended: true },
  "2022-11-22": { attended: true },
  "2022-11-24": { attended: false }
}

const QuizContent = () => {
  const router = useRouter();
  const [activeQuizId, setActiveQuizId] = React.useState(null);
  const [activeQuestionId, setActiveQuestionId] = React.useState(null);
  const [activeQuestion, setActiveQuestion] = React.useState(null);
  const [isPolling, setIsPolling] = React.useState(false);

  React.useEffect(() => {
    return onSnapshot(doc(db, "courses", router.query.courseId), (snapshot) => {
      const quizId = snapshot.data().activeQuiz;
      const questionId = snapshot.data().activeQuestion;
      setActiveQuizId(quizId);
      setActiveQuestionId(questionId);
      setIsPolling(snapshot.data().isPolling);
      if (!quizId || !questionId) return;
      (async () => {
        const questionDoc = await getDoc(doc(db, "courses", router.query.courseId, "quizzes", quizId, "questions", questionId));
        setActiveQuestion(questionDoc.data().question);
      })();
    });
  }, [router.query.courseId]);

  const quizOngoing = !!activeQuestionId && isPolling;

  if (quizOngoing) {
    return <>
      <QuizActiveContent
        activeQuizId={activeQuizId}
        activeQuestionId={activeQuestionId}
        activeQuestion={activeQuestion}
      />
    </>;
  }
  else {
    return <>
      <QuizNonActiveContent />
    </>;
  }
}

const QuizNonActiveContent = () => {
  return <>
    <Container>
      <Stack
        sx={{ height: '80vh' }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Alert
          severity="info"
          icon={<InfoIcon sx={{ fontSize: {xs: 40, sm: 80} }} />}
          style={{ fontSize: 30, display: 'flex', alignItems: 'center', width: '70%' }}
        >
          Questions will appear here when the instructor starts polling.
        </Alert>
      </Stack>
    </Container>
  </>
}

const QuizActiveContent = ({ activeQuizId, activeQuestionId, activeQuestion }) => {
  const router = useRouter();
  const [currentAns, setCurrentAns] = React.useState(null);
  const [hasAnswered, setHasAnswered] = React.useState(false);
  const { user } = useAuth();

  React.useEffect(() => {
    (async () => {
      if (activeQuizId && activeQuestionId) {
        const responseDoc = doc(db, "courses", router.query.courseId, "quizzes", activeQuizId, "submissions", activeQuestionId, "students", user.uid);
        const responseSnap = await getDoc(responseDoc);
        if (responseSnap.exists()) {
          return onSnapshot(responseDoc, (snapshot) => {
            setCurrentAns(snapshot.data().response);
          });
        }
      }
      setCurrentAns(null);
    })();
  }, [activeQuestionId, hasAnswered]);

  function handleSelectAnswer(optionIndex) {
    setDoc(doc(db, "courses", router.query.courseId, "quizzes", activeQuizId, "submissions", activeQuestionId, "students", user.uid), {
      response: optionIndex
    });
    setHasAnswered(true);
  };

  return <Container>
    <Grid container spacing={4} align="center">
      <Grid item xs={12}>
        <Typography variant="h3" component="h1" sx={{ pt: 5, pb: 5 }}>
          {activeQuestion}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Button
          variant={(currentAns === 0) ? "contained" : "outlined"}
          color="secondary"
          style={{ width: '100%', height: '20vh', fontSize: 50 }}
          onClick={() => { handleSelectAnswer(0) }}
        >
          A
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant={(currentAns === 1) ? "contained" : "outlined"}
          color="warning"
          style={{ width: '100%', height: '20vh', fontSize: 50 }}
          onClick={() => { handleSelectAnswer(1) }}
        >
          B
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant={(currentAns === 2) ? "contained" : "outlined"}
          color="error"
          style={{ width: '100%', height: '20vh', fontSize: 50 }}
          onClick={() => { handleSelectAnswer(2) }}
        >
          C
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant={(currentAns === 3) ? "contained" : "outlined"}
          color="success"
          style={{ width: '100%', height: '20vh', fontSize: 50 }}
          onClick={() => { handleSelectAnswer(3) }}
        >
          D
        </Button>
      </Grid>
    </Grid>
  </Container>
}

const AttendanceContent = () => {
  return <Container>
    <Grid container spacing={4} sx={{ pt: 2, pb: 15}}>
      <Grid item xs={12}>
        <Typography variant="h3" component="h1" sx={{ pt: 2, pb: 2 }}>
          Attendance
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} align="center" sx={{ pt: 10, pb: 10 }} >
          <CircularPercentProgress size={250} value={80} fontSize={50} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} align="center" justifyContent="center" sx={{ }} >
          <AttendanceCalendar attendanceData={attendanceData} />
        </Paper>
      </Grid>
    </Grid>
  </Container>
}

const GradesContent = () => {
  return <Container>
    <Grid container spacing={4} sx={{ pt: 2, pb: 15}}>
      <Grid item xs={12}>
        <Typography variant="h3" component="h1" sx={{ pt: 2, pb: 2 }}>
          Grades
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} align="center" sx={{ pt: 10, pb: 10 }} >
          <CircularPercentProgress size={250} value={90} fontSize={50} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} align="center">
        <Paper elevation={3} align="center" sx={{ p: 2 }} >
          <GradeTimeline />
        </Paper>
      </Grid>
    </Grid>
  </Container>
}

const Content = () => {
  const router = useRouter();
  const section = router.query.tab;

  switch (section) {
    case "grades":
      return <GradesContent />;
    case "attendance":
      return <AttendanceContent />;
    default:
      return <QuizContent />;
  }
};

export default function Class() {
  const router = useRouter();
  const [value, setValue] = React.useState(() => {
    switch (router.query.tab) {
      case "grades":
        return 1;
      case "attendance":
        return 2;
      default:
        return 0;
    }
  });

  return (
    <>
      <Container>
        <Content />
      </Container>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Quiz" icon={<QuizIcon />} onClick={() => { router.push('/course/' + router.query.courseId); }} />
          <BottomNavigationAction label="Grades" icon={<InsightsIcon />} onClick={() => { router.push('/course/' + router.query.courseId + '/grades'); }} />
          <BottomNavigationAction label="Attendance" icon={<EventAvailableIcon />} onClick={() => { router.push('/course/' + router.query.courseId + '/attendance'); }} />
        </BottomNavigation>
      </Paper>
    </>
  );
}
