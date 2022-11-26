import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({open, setOpen, createClass}) {
  const [userInput, setUserInput] = React.useState({name: "", description: "", time: ""});

  const handleClose = () => {
    setUserInput({name: "", description: "", time: ""});
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Create a Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the details of your course here. You cannot edit this later so get the spelling
            right the first time!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            variant="standard"
            value={userInput.name}
            onChange={(e) => {
              setUserInput({...userInput, name: e.target.value});
            }}
          />
          <TextField
            margin="dense"
            id="time"
            label="Time"
            fullWidth
            variant="standard"
            value={userInput.time}
            onChange={(e) => {
              setUserInput({...userInput, time: e.target.value});
            }}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            variant="standard"
            value={userInput.description}
            onChange={(e) => {
              setUserInput({...userInput, description: e.target.value});
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button onClick={() => {
            const name = userInput.name.trim();
            const description = userInput.description.trim();
            const time = userInput.time.trim();
            const thumbnail = (() => {
              switch (name)
              {
                case "CS 135":   return "/img/banners/cs.jpg";
                case "PHYS 121": return "/img/banners/physics.jpg"; 
                case "ECON 101": return "/img/banners/stocks.jpg"; 
                case "MATH 135": return "/img/banners/proofs.jpg";
                case "MATH 137": return "/img/banners/calc.jpg";
                default: return "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="; // blank image :)
              }
            })();
            createClass(name, description, time, thumbnail)

            handleClose();
            }}>Create</Button>
        </DialogActions>
    </Dialog>
  );
}
