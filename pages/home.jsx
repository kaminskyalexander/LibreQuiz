import * as React from 'react';
import CourseCard from '../components/CourseCard';
import JoinClassDialog from '../components/JoinClassDialog';
import CreateClassDialog from '../components/CreateClassDialog';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAuth } from '../contexts/AuthContext';
import { getDoc, doc, updateDoc, arrayUnion, arrayRemove, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useEffect, useState } from 'react';

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up('sm'));
  const [courses, setCourses] = useState([]);

  const { getUser } = useAuth();

  function joinClass(id) {
    getDoc(doc(db, "courses", id)).then((classSnap) => {

      if (classSnap.exists()) {
        updateDoc(doc(db, "users", getUser().uid), {
          enrolledCourses: arrayUnion(id)
        });
      }
    });
  }

  function removeClass(id) {
    getDoc(doc(db, "courses", id)).then((classSnap) => {

      if (classSnap.exists()) {
        updateDoc(doc(db, "users", getUser().uid), {
          enrolledCourses: arrayRemove(id)
        });
      }
    });
  }

  function createClass(id, name, description, time, thumbnail) {
    setDoc(
      doc(db, "courses", id),
      {
        name: name,
        time: time,
        description: description,
        thumbnail: thumbnail
      }
    );

    updateDoc(doc(db, "users", getUser().uid), {
      ownedCourses: arrayUnion(id)
    });
  }

  const unsubscribe = onSnapshot(doc(db, "users", getUser().uid), (snapshot) => {
    (async () => {
      const enrolledCourses = snapshot.data().enrolledCourses;
      const ownedCourses = snapshot.data().ownedCourses;
      let coursesTemp = [];

      for (const courseId of enrolledCourses.concat(ownedCourses)) {
        const courseDoc = doc(db, "courses", courseId);
        const courseSnap = await getDoc(courseDoc)
        const courseData = courseSnap.data();
        coursesTemp.push({ id: courseId, ...courseData, href: "course/" + courseId });
      }

      if (courses.length !== coursesTemp.length) {
        setCourses(coursesTemp);
      }
    })();
  });


  const [joinCourseDialogOpen, setJoinCourseDialogOpen] = React.useState(false);
  const [createCourseDialogOpen, setCreateCourseDialogOpen] = React.useState(false);

  return (
    <>
      <Container>
        <Stack container sx={{ pt: 4 }} justifyContent="space-between" direction="row">
          <Typography variant="h3" component="h1">
            My Courses
          </Typography>

          {isMobile && (<Stack spacing={4} direction="row">
            <Button
              variant="text"
              color="primary"
              aria-label="create"
              onClick={() => { setCreateCourseDialogOpen(true); }}
            >
              Create a Course
            </Button>
            <Fab
              variant="extended"
              color="primary"
              aria-label="join"
              onClick={() => { setJoinCourseDialogOpen(true); }}
            >
              <AddIcon sx={{ mr: 1 }} />
              Join a Course
            </Fab>
          </Stack>
          )}
        </Stack>
        <Grid container spacing={2} sx={{ pt: 4, pb: 4 }}>
          {courses.map((course, i) => (
            <Grid item xs={12} sm={4} md={3} key={`course-${i}`}>
              <CourseCard
                name={course.name}
                time={course.time}
                description={course.description}
                thumbnail={course.thumbnail}
                href={course.href}
                onRemove={() => { removeClass(course.id) }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      {
        !isMobile && (
          <Fab
            color="primary"
            sx={{
              position: 'fixed',
              bottom: (theme) => theme.spacing(2),
              right: (theme) => theme.spacing(2),
            }}
            aria-label="add"
            onClick={() => { setJoinCourseDialogOpen(true); }}
          >
            <AddIcon />
          </Fab>
        )
      }
      <JoinClassDialog
        open={joinCourseDialogOpen}
        setOpen={setJoinCourseDialogOpen}
        joinClass={joinClass}
      />
      <CreateClassDialog
        open={createCourseDialogOpen}
        setOpen={setCreateCourseDialogOpen}
        createClass={createClass}
      />
    </>
  );
}
