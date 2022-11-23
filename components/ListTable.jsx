import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ConfirmationDialog from './ConfirmationDialog';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";

export default function ListTable({ title, items, handleRemove, handleClick }) {
  let [confirmOpen, setConfirmOpen] = useState(false);
  let [itemToDelete, setItemToDelete] = useState();

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{title}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} hover onClick={event => {
                handleClick(item.id);
              }}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    onMouseDown={event => event.stopPropagation()}
                    onTouch={event => {
                      event.stopPropagation();
                      event.preventDefault();
                      setItemToDelete(item.id);
                      setConfirmOpen(true);
                    }}
                    onClick={event => {
                      event.stopPropagation();
                      event.preventDefault();
                      setItemToDelete(item.id);
                      setConfirmOpen(true);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmationDialog
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onYes={() => handleRemove(itemToDelete)}
      ></ConfirmationDialog>
    </>
  );
}
