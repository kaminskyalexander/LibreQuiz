import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';


export default function AttendanceCalendar() {
  const [value, setValue] = React.useState(dayjs(new Date())); // Set current value to today

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        label="Week picker"
        openTo="day"
        value={value}
        readOnly
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
