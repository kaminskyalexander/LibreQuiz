import AttendanceCalendar from "../../components/AttendanceCalendar"
import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Container from '@mui/material/Container';
import QuizIcon from '@mui/icons-material/Quiz';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import InsightsIcon from '@mui/icons-material/Insights';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router';


const attendanceData = {
  "2022-10-04": {attended: true},
  "2022-10-06": {attended: false},
  "2022-10-11": {attended: true},
  "2022-10-13": {attended: true},
  "2022-10-18": {attended: true},
  "2022-10-20": {attended: true},
  "2022-10-25": {attended: false},
  "2022-10-27": {attended: true},
  "2022-11-01": {attended: true},
  "2022-11-03": {attended: false}
}

const Content = () => {
  const router = useRouter();
  const section = router.query.tab;

  switch (section) {
    case "grades":
      return <div>Grades</div>;
    case "attendance":
      return <div>Attendance</div>
    default:
      return <div>Quiz</div>;
  }
};

export default function Class() {
  const router = useRouter();
  const [value, setValue] = React.useState(0);

  return (
    <>
    <Container>
      <Content/>
    </Container>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
    <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Quiz" icon={<QuizIcon />} onClick={() => {router.push('/class');}}/>
        <BottomNavigationAction label="Grades" icon={<InsightsIcon />} onClick={() => {router.push('/class/grades');}}/>
        <BottomNavigationAction label="Attendance" icon={<EventAvailableIcon />} onClick={() => {router.push('/class/attendance');}}/>
      </BottomNavigation>
      </Paper>
    </>
    );
}
