import React, { createRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Alert, Snackbar } from '@mui/material';

const SnackBarCustom = (
    {
        open,
        setOpen,
        vertical,
        horizontal,
        severityOption,
        msj,
    }
) => {
    const ref = createRef();
    const AlertRef = forwardRef((props, ref) => (
        <Alert ref={ref} severity={severityOption} sx={{ width: '100%' }} onClose={() => setOpen(false)}>
            {msj}
        </Alert>
      ));

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical, horizontal }}
            >
            <AlertRef ref={ref} />
        </Snackbar>
    )
}

SnackBarCustom.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    vertical: PropTypes.string,
    horizontal: PropTypes.string,
    severityOption: PropTypes.string,
    msj: PropTypes.string,
};

export default SnackBarCustom;