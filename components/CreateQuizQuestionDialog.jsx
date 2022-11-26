import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Divider from "@mui/material/Divider"

export default function FormDialog({ open, setOpen, createQuizQuestion }) {
  const [userInput, setUserInput] = React.useState({ question: "", correctOptions: [false, false, false, false], options: ["", "", "", ""] });

  const handleClose = () => {
    setUserInput({ question: "", correctOptions: [false, false, false, false], options: ["", "", "", ""] });
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Create a Question</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Question"
          fullWidth
          variant="standard"
          value={userInput.question}
          onChange={(e) => {
            setUserInput({ ...userInput, question: e.target.value });
          }}
        />
        <DialogContentText sx={{ pt: 4 }}>
          Check the correct answers.
        </DialogContentText>
        {["A", "B", "C", "D"].map((q, i) => (
          <Stack direction="row" alignItems="flex-end">
            <Checkbox
              checked={userInput.correctOptions[i]}
              onChange={(e) => {
                // basically this replaces the element at correctOptions[i] with e.target.value
                setUserInput({
                  ...userInput, correctOptions: (() => {
                    let correctOptionsCopy = userInput.correctOptions;
                    correctOptionsCopy[i] = !correctOptionsCopy[i];
                    return correctOptionsCopy;
                  })()
                });
              }}
            />
            <TextField
              margin="dense"
              id={"option-" + q}
              label={"Option " + q}
              fullWidth
              variant="standard"
              value={userInput.options[i]}
              onChange={(e) => {
                // basically this replaces the element at options[i] with e.target.value
                setUserInput({
                  ...userInput, options: (() => {
                    let optionsCopy = userInput.options;
                    optionsCopy[i] = e.target.value;
                    return optionsCopy;
                  })()
                });
              }}
            />
          </Stack>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Cancel</Button>
        <Button onClick={() => {
          createQuizQuestion(userInput.question, userInput.correctOptions, userInput.options);
          handleClose();
        }}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
