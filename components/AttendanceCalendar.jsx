import * as React from "react";

import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersDay } from "@mui/x-date-pickers";

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => (prop !== "hasEntry" || prop !== "attended")
})(({ theme, hasEntry, attended }) => ({
  ...(hasEntry && {
    backgroundColor: attended && theme.palette.success.light || theme.palette.error.light,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: attended && theme.palette.success.main || theme.palette.error.main
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
    ;
  }

  const renderPickerDay = (date, selectedDates, pickersDayProps) => {
    const dateKey = date.format("YYYY-MM-DD"); // Index object using string key
    const hasEntry = dateKey in data;
    const attended = hasEntry && data[dateKey].attended;
    return (
      <CustomPickersDay
        {...pickersDayProps}
        hasEntry={hasEntry}
        attended={attended}
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
