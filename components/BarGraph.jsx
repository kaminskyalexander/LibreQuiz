import * as React from "react";
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Bar = styled(LinearProgress)(({ theme, value }) => ({
  height: "100%",
  borderRadius: theme.spacing(1),
  "& span.MuiLinearProgress-bar": {
    borderRadius: theme.spacing(1),
    transform: `translateY(${100 - value}%) !important` // has to have !important
  }
}));

export default function BarGraph({ data, labelVariant, showValues, height}) {
  return (<Grid container height={height} columnSpacing={10} alignItems="stretch">
    {data.map(({ label, value, color }, index) => {
      return <Grid
        item
        xs={3}
        key={`bar-${index}`}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Bar variant="determinate" value={value ? value : 0} color={color} />
        <Typography variant={labelVariant} align="center">{label}</Typography>
        {showValues && <Typography align="center">{value ? value : 0}%</Typography>}
      </Grid>;
    })}
  </Grid>);
}