import * as React from 'react';
import CourseCard from '../components/CourseCard';
import JoinClassDialog from '../components/JoinClassDialog';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const courses = [
  {
    name: 'CS 135',
    time: '10:00 AM',
    description: 'Section 012',
    thumbnail: '/img/banners/cs.jpg',
    href: '#',
  },
  {
    name: 'MATH 135',
    time: '10:00 AM',
    description: 'Section 012',
    thumbnail: '/img/banners/proofs.jpg',
    href: '#',
  },
  {
    name: 'MATH 137',
    time: '10:00 AM',
    description: 'Section 012',
    thumbnail: '/img/banners/calc.jpg',
    href: '#',
  },
  {
    name: 'PHYS 121',
    time: '10:00 AM',
    description: 'Section 012',
    thumbnail: '/img/banners/physics.jpg',
    href: '#',
  },
  {
    name: 'ECON 101',
    time: '10:00 AM',
    description: 'Section 012',
    thumbnail: '/img/banners/stocks.jpg',
    href: '#',
  },
];

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up('sm'));

  const [addCourseDialogOpen, setAddCourseDialogOpen] = React.useState(false);

  const handleClickAddCourse = () => {
    setAddCourseDialogOpen(true);
  };

  return (
    <>
      <Container>
        <Grid container sx={{ pt: 4 }}>
          <Grid item xs>
            <Typography variant="h3" component="h1">
              My Courses
            </Typography>
          </Grid>

          {isMobile && (
            <Grid item xs="auto">
              <Fab
                variant="extended"
                color="primary"
                aria-label="add"
                onClick={handleClickAddCourse}
              >
                <AddIcon sx={{ mr: 1 }} />
                Add a Course
              </Fab>
            </Grid>
          )}
        </Grid>
        <Grid container spacing={2} sx={{ pt: 4, pb: 4 }}>
          {courses.map((course, i) => (
            <Grid item xs={12} sm={4} md={3} key={`course-${i}`}>
              <CourseCard
                name={course.name}
                time={course.time}
                description={course.description}
                thumbnail={course.thumbnail}
                href={course.href}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      {!isMobile && (
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2),
          }}
          aria-label="add"
          onClick={handleClickAddCourse}
        >
          <AddIcon />
        </Fab>
      )}
      <JoinClassDialog
        open={addCourseDialogOpen}
        setOpen={setAddCourseDialogOpen}
      />
    </>
  );
}
