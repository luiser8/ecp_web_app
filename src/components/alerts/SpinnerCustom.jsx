import { CircularProgress, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const SpinnerCustom = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '60vh' }}
        >
            <Grid item xs={3}>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </Grid>
        </Grid>
    )
}

export default SpinnerCustom;