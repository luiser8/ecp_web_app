import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';

const FormResume = ({ mode, productPayload, productMaterial, setProductMaterial }) => {
    return (
        <Grid component="div" container>
            <Box component="div" noValidate sx={{ width: '50%', pl: 2 }} >
                <p>{productPayload.code}</p>
                <p>{productPayload.name}</p>
                <p>{productPayload.description}</p>
            </Box>
            <Box component="div" noValidate sx={{ width: '50%', pl: 2 }} >
                {productMaterial.map((item, key) => (
                    <Fragment key={key}>
                        <p>{item.material}</p>
                    </Fragment>
                ))}
            </Box>
        </Grid>
    )
}

FormResume.propTypes = {
    mode: PropTypes.string,
    productPayload: PropTypes.object,
    productMaterial: PropTypes.array,
    setProductMaterial: PropTypes.func,
};

export default FormResume;