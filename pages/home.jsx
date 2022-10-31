import CourseCard from "../components/CourseCard";
import AddIcon from '@mui/icons-material/Add';
import { Grid, Typography, Fab, Container } from "@mui/material";

export default function Home() {
  return <>
    <Grid container>
      <Grid xs>
        <Typography variant="h3" component="h1">My Courses</Typography>
      </Grid>
      <Grid xs="auto">
        <Fab variant="extended" color="primary">
          <AddIcon sx={{ mr: 1 }} />
          Add a Course
        </Fab>
      </Grid>
    </Grid>
    <CourseCard
      name="CS 135"
      time="10:00 AM"
      description="Section 012"
      thumbnail="/img/banners/cs.jpg"
      href="https://google.com"
    />
  </>;
}
