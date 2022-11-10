import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

export default function ConfirmationDialog({ open, setOpen, onYes }) {
  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>Are you sure?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onYes();
              handleClose();
            }}
          >
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
