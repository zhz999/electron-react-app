import {Alert, Snackbar} from "@mui/material";

export default function AlertBox({open, handleClose, message}) {
    return (<div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                  anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
            <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                {message}
            </Alert>
        </Snackbar>
    </div>)

}
