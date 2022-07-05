import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const BackdropCustom = ({ open }) => {
  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        >
        <CircularProgress color="inherit" />
    </Backdrop>
  )
}

BackdropCustom.propTypes = {
    open : PropTypes.bool
}

export default BackdropCustom;