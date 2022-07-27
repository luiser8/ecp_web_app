import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const FormProduct = ({ mode, productPayload, setProductPayload }) => {
    return (
        <Grid component="div">
            <Box component="form" noValidate sx={{ width: '60%', pl: 2 }}>
                <TextField
                    value={productPayload.code}
                    onChange={(ev) => setProductPayload({ ...productPayload, code: ev.target.value })}
                    margin="normal"
                    required
                    type="text"
                    fullWidth
                    id="code"
                    label="Código"
                    name="code"
                    size="small"
                    autoFocus
                />
                <TextField
                    value={productPayload.name}
                    onChange={(ev) => setProductPayload({ ...productPayload, name: ev.target.value })}
                    margin="normal"
                    required
                    type="text"
                    fullWidth
                    id="name"
                    label="Nombre"
                    name="name"
                    size="small"
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
                <FormControl fullWidth style={{ marginTop: "14px" }}>
                    <InputLabel id="status" style={{ marginTop: "-7px" }}>Estado</InputLabel>
                    <Select
                        size="small"
                        labelId="status"
                        id="status"
                        value={productPayload.status}
                        label="Estado"
                        required
                        onChange={(ev) => setProductPayload({ ...productPayload, status: ev.target.value })}
                    >
                        <MenuItem value="in process">En proceso</MenuItem>
                        <MenuItem value="finished">Terminado</MenuItem>
                        <MenuItem value="slow">Detenido</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Grid>
    )
}

FormProduct.propTypes = {
    mode: PropTypes.string,
    productPayload: PropTypes.object,
    setProductPayload: PropTypes.func,
};

export default FormProduct;