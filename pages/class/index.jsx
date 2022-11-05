import AttendanceCalendar from "../../components/AttendanceCalendar"

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

export default function Class() {
  return <>
    <AttendanceCalendar attendanceData={attendanceData}/>
  </>;
}
