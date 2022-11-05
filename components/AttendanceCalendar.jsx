import * as React from "react";

import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersDay } from "@mui/x-date-pickers";

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "selected"
})(({ theme, selected }) => ({
  ...(selected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark
    },
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%"
  })
}));

export default function AttendanceCalendar({ attendanceData }) {

  const [data, setData] = React.useState(attendanceData);

  const isInAttendance = (date) => {
    for (const [key, value] of Object.entries(data))
    {
      console.log(key);
      if (date.isSame(dayjs(key)))
      {
        return true;
      }
    }
    return false;
  }

  const renderPickerDay = (date, selectedDates, pickersDayProps) => {
    const selected = isInAttendance(date);
    return (
      <CustomPickersDay
        {...pickersDayProps}
        selected={selected}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        openTo="day"
        value={data}
        readOnly
        disableFuture
        renderDay={renderPickerDay}
      />
    </LocalizationProvider>
  );
}
