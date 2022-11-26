import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

export default function FormDialog({open, setOpen}) {
    const router = useRouter();
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {router.query.courseId}
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    CLOSE
                </Button>
            </DialogActions>
        </Dialog>);
}