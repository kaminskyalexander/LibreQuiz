import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({open, setOpen, joinClass}) {
  const handleClose = (joined) => {
    setOpen(false);
  };
  const [userInput, setUserInput] = React.useState("");

  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Join a Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ask your instructor for the course code, then enter it here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Course Code"
            fullWidth
            variant="standard"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Cancel</Button>
          <Button onClick={() => {
            handleClose(true);
            if(userInput !== ""){
              joinClass(userInput);
            }
            }}>Join</Button>
        </DialogActions>
    </Dialog>
  );
}
