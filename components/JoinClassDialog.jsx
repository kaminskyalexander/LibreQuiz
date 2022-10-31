import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({open, setOpen}) {
  const handleClose = () => {
    setOpen(false);
  };

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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Join</Button>
        </DialogActions>
    </Dialog>
  );
}
