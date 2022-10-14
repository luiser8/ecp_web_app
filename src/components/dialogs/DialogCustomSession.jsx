import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Button, DialogActions, DialogContentText } from '@mui/material';
import { Context } from '../../auth/Context';
import { loginRefreshUserService } from '../../services/userService';

const DialogCustomSession = ({ open, setOpen }) => {
    const navigate = useNavigate();
    const { checkUser, logout, loginRefresh } = useContext(Context);
    const { refreshtoken} = checkUser();

    const handleRenewSession = async () => {
        setOpen(false);
        const userLoginRefresh = await loginRefreshUserService(refreshtoken);
        if (Object.keys(userLoginRefresh).length !== 0) {
            const newAccesstoken = userLoginRefresh.accesstoken;
            loginRefresh({
                'accesstoken': newAccesstoken
            });
            navigate(0);
        };
    }

    const handleCloseSession = () => {
        logout(null); setOpen(false);
    }

    const handleClose = (_, reason) => {
        if (reason && reason == "backdropClick") return;
        setOpen(false);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Estado de la sesión</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">Su sesión esta expirada, puede renovarla o cerrarla.</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleRenewSession}>Continuar sesión</Button>
                <Button variant="contained" onClick={handleCloseSession}>Cerrar sesión</Button>
            </DialogActions>
        </Dialog>
    );
}

DialogCustomSession.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    callMethod: PropTypes.bool,
    method: PropTypes.func,
};

export default DialogCustomSession;
