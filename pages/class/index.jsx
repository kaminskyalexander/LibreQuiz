import AttendanceCalendar from "../../components/AttendanceCalendar"
import CircularPercentProgress from "../../components/CircularPercentProgress"
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
import LooksOneIcon from '@mui/icons-material/LooksOne';

const attendanceData = {
  "2022-10-04": { attended: true },
  "2022-10-06": { attended: false },
  "2022-10-11": { attended: true },
  "2022-10-13": { attended: true },
  "2022-10-18": { attended: true },
  "2022-10-20": { attended: true },
  "2022-10-25": { attended: false },
  "2022-10-27": { attended: true },
  "2022-11-01": { attended: true },
  "2022-11-03": { attended: false }
}

const Content = () => {
  const router = useRouter();
  const section = router.query.tab;

  switch (section) {
    case "grades":
      return <>
        <Container>
          <Grid container spacing={4} align = "center">
            <Grid item xs={12}>
              <Typography variant="h3" component="h1" sx={{p: '10vh'}}>
              Grades
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <CircularPercentProgress size={300} value={51} fontSize={50} />
            </Grid>
          </Grid>
        </Container>
      </>;
    case "attendance":
      return <>
      <Container>
        <Grid container spacing={4} align = "center">
          <Grid item xs={12}>
            <Typography variant="h3" component="h1" sx={{p: '10vh'}}>
            Attendance
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <AttendanceCalendar attendanceData={attendanceData}/>
          </Grid>
          <Grid item xs={6}>
              <CircularPercentProgress size={300} value={80} fontSize={50} />
            </Grid>
        </Grid>
      </Container>
      </>;
    default:
      return <>
        <Container>
          <Grid container spacing={4} align = "center">
           <Grid item xs={12}>
            <Typography variant="h3" component="h1" sx={{p: '10vh'}}>
              Question 1
            </Typography>
           </Grid>

           <Grid item xs={6}>
            <Button variant="outlined"  sx={{ color: 'red', borderColor: 'red'}}  
            style={{ width: '100%', height: '20vh', fontSize: '5vw'}}>A</Button>
           </Grid>
           <Grid item xs={6}>
            <Button variant="outlined" sx={{ color: 'orange', borderColor: 'orange'}} 
            style={{ width: '100%', height: '20vh', fontSize: '5vw'}}>B</Button>
           </Grid>
           <Grid item xs={6}>
            <Button variant="outlined" sx={{ color: 'green', borderColor: 'green'}}
            style={{ width: '100%', height: '20vh', fontSize: '5vw'}}>C</Button>
           </Grid>
           <Grid item xs={6}>
            <Button variant="outlined" sx={{ color: '#2074d4', borderColor: '#2074d4'}}
            style={{ width: '100%', height: '20vh', fontSize: '5vw'}}>D</Button>
           </Grid>
          </Grid>
        </Container>
      </>
  }
};

export default function Class() {
  const router = useRouter();
  const [value, setValue] = React.useState(0);

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
          <BottomNavigationAction label="Quiz" icon={<QuizIcon />} onClick={() => { router.push('/class'); }} />
          <BottomNavigationAction label="Grades" icon={<InsightsIcon />} onClick={() => { router.push('/class/grades'); }} />
          <BottomNavigationAction label="Attendance" icon={<EventAvailableIcon />} onClick={() => { router.push('/class/attendance'); }} />
        </BottomNavigation>
      </Paper>
    </>
  );
}
