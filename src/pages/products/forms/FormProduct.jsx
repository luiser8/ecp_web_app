import { Box, Grid, TextField } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const FormProduct = ({ mode, productPayload, setProductPayload, checkCodeOrNameExists, isCodeRepit, isNameRepit }) => {
    return (
        <Grid component="div">
            <Box component="form" noValidate sx={{ width: '60%', pl: 2 }}>
                <TextField
                    value={productPayload.code}
                    onChange={(ev) => setProductPayload({ ...productPayload, code: ev.target.value })}
                    onKeyUp={(ev) => checkCodeOrNameExists('code', ev.target.value)}
                    margin="normal"
                    required
                    error={isCodeRepit}
                    helperText={isCodeRepit ? "Código repetido" : ""}
                    type="text"
                    fullWidth
                    id="code"
                    label={isCodeRepit ? "Error" : "Código"}
                    name="code"
                    size="small"
                    autoFocus
                    sx={{ marginBottom: isCodeRepit ? -1 : 1 }}
                />
                <TextField
                    value={productPayload.name}
                    onChange={(ev) => setProductPayload({ ...productPayload, name: ev.target.value })}
                    onKeyUp={(ev) => checkCodeOrNameExists('name', ev.target.value)}
                    margin="normal"
                    required
                    error={isNameRepit}
                    helperText={isNameRepit ? "Nombre repetido" : ""}
                    type="text"
                    fullWidth
                    id="name"
                    label={isNameRepit ? "Error" : "Nombre"}
                    name="name"
                    size="small"
                    sx={{ marginBottom: isNameRepit ? -1 : 1 }}
                />
                <TextField
                    value={productPayload.description}
                    onChange={(ev) => setProductPayload({ ...productPayload, description: ev.target.value })}
                    margin="normal"
                    required
                    type="text"
                    fullWidth
                    id="description"
                    label="Descripción"
                    name="description"
                    size="small"
                />
                <TextField
                    value={productPayload.presentation}
                    onChange={(ev) => setProductPayload({ ...productPayload, presentation: ev.target.value })}
                    margin="normal"
                    required
                    type="text"
                    fullWidth
                    id="presentation"
                    label="Presentación"
                    name="presentation"
                    size="small"
                />
                <TextField
                    value={productPayload.boxes_x_mix}
                    onChange={(ev) => setProductPayload({ ...productPayload, boxes_x_mix: Number(ev.target.value) })}
                    margin="normal"
                    required
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    id="boxes_x_mix"
                    label="Cajas por mezcla"
                    name="boxes_x_mix"
                    size="small"
                />
                <TextField
                    value={productPayload.units_x_mix}
                    onChange={(ev) => setProductPayload({ ...productPayload, units_x_mix: Number(ev.target.value) })}
                    margin="normal"
                    required
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    id="units_x_mix"
                    label="Unidades por mezcla"
                    name="units_x_mix"
                    size="small"
                />
                <TextField
                    value={productPayload.margin_of_gain}
                    onChange={(ev) => setProductPayload({ ...productPayload, margin_of_gain: Number(ev.target.value) })}
                    margin="normal"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    id="margin_of_gain"
                    label="Margen de ganancia"
                    name="margin_of_gain"
                    size="small"
                />
                <TextField
                    value={productPayload.pvp_x_boxes}
                    onChange={(ev) => setProductPayload({ ...productPayload, pvp_x_boxes: Number(ev.target.value) })}
                    margin="normal"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    id="pvp_x_boxes"
                    label="PVP por cajas"
                    name="pvp_x_boxes"
                    size="small"
                />
                <TextField
                    value={productPayload.pvp_x_units}
                    onChange={(ev) => setProductPayload({ ...productPayload, pvp_x_units: Number(ev.target.value) })}
                    margin="normal"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    id="pvp_x_units"
                    label="PVP por unidades"
                    name="pvp_x_units"
                    size="small"
                />
            </Box>
        </Grid>
    )
}

FormProduct.propTypes = {
    mode: PropTypes.string,
    productPayload: PropTypes.object,
    setProductPayload: PropTypes.func,
    checkCodeOrNameExists: PropTypes.func,
    isCodeRepit: PropTypes.bool,
    isNameRepit: PropTypes.bool,
};

export default FormProduct;