import CourseCard from "../components/CourseCard";
import AddIcon from '@mui/icons-material/Add';
import { Grid, Typography, Fab, Container } from "@mui/material";

const courses = [
  {
    "name": "CS 135",
    "time": "10:00 AM",
    "description": "Section 012",
    "thumbnail": "/img/banners/cs.jpg",
    "href": "#"
  },
  {
    "name": "MATH 135",
    "time": "10:00 AM",
    "description": "Section 012",
    "thumbnail": "/img/banners/proofs.jpg",
    "href": "#"
  },
  {
    "name": "MATH 137",
    "time": "10:00 AM",
    "description": "Section 012",
    "thumbnail": "/img/banners/calc.jpg",
    "href": "#"
  },
  {
    "name": "PHYS 121",
    "time": "10:00 AM",
    "description": "Section 012",
    "thumbnail": "/img/banners/physics.jpg",
    "href": "#"
  },
  {
    "name": "ECON 101",
    "time": "10:00 AM",
    "description": "Section 012",
    "thumbnail": "/img/banners/stocks.jpg",
    "href": "#"
  }
]

export default function Home() {
  return <Container>
    <Grid container style={{"paddingTop": "1rem", "paddingBottom": "1rem"}}>
      <Grid item xs>
        <Typography variant="h3" component="h1">My Courses</Typography>
      </Grid>
      <Grid item xs="auto">
        <Fab variant="extended" color="primary">
          <AddIcon sx={{ mr: 1 }} />
          Add a Course
        </Fab>
      </Grid>
    </Grid>
    <Grid container spacing={2}>
      {courses.map(course => (
        <Grid item xs={12} sm={6} md={3}>
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
  </Container>;
}
