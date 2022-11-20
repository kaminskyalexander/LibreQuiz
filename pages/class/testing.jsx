import React from "react";
import Button from '@mui/material/Button';
import { styled } from "@mui/material/styles";

const QuestionButton = styled(Button, {
    shouldForwardProp: (prop) => (prop !== "flag")
  }) (({ theme, flag }) => ({
    ...({
      variant: flag && "outlined" || "contained"
      })
    })
  );

export default function ButtonClick() {
  const [flag, setFlag] = React.useState(true);

  const handleClick = () => {
    setFlag(!flag);
  };

  return (
    <Button
      onClick={handleClick}
      variant={ flag && "outlined" || "contained"}
    >
      button
    </Button>
  );
}