import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({open, setOpen, createQuiz}) {
  const [userInput, setUserInput] = React.useState("");

  const handleClose = () => {
    setUserInput("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Create a Quiz</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Quiz Name"
            fullWidth
            variant="standard"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button onClick={() => {
            if(userInput !== ""){
              createQuiz(userInput.trim());
            }
            handleClose();
            }}>Create</Button>
        </DialogActions>
    </Dialog>
  );
}
