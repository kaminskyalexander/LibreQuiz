import AttendanceCalendar from "../../components/AttendanceCalendar"
import dayjs from "dayjs";

const attendanceData = {
  "2022-10-4": true,
  "2022-10-6": false,
  "2022-10-11": true,
  "2022-10-13": true,
  "2022-10-18": true,
  "2022-10-20": true
}

export default function Class() {
  return <>
    <AttendanceCalendar attendanceData={attendanceData}/>
  </>;
}
