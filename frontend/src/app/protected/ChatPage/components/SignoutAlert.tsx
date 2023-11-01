import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { FaSignOutAlt } from "react-icons/fa";

export default function SignOutAlertDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const logout = () => {
        handleClose();
    }
    return (
        <div>
            <FaSignOutAlt style={{ color: 'white', fontSize: '20px' }} onClick={handleClickOpen} />
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Are you sure you want to logout ?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={logout}>logout</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}