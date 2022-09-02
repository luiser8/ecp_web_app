import React from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const FormPackings =
  ({
    mode,
    units,
    suppliers,
    packingsPayload,
    setPackingsPayload,
    checkCodeOrNameExists,
    isCodeRepit,
    isNameRepit,
    isValidPackingsPayload,
    submit
  }) => {
    return (
      <Grid component="div">
        <Box component="form" noValidate sx={{ width: '60%', pl: 2 }}>
          <FormControl fullWidth style={{ marginTop: "14px" }}>
            <InputLabel id="unit" style={{ marginTop: "-7px" }}>Unidad de medida</InputLabel>
            <Select
              size="small"
              labelId="unit"
              id="unit"
              value={packingsPayload.unit}
              label="Unidad de medida"
              required
              onChange={(ev) => setPackingsPayload({ ...packingsPayload, unit: ev.target.value })}
            >
              {units.map((_, item) => (
                <MenuItem key={units[item]._id} value={units[item]._id}>{units[item].name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ marginTop: "14px" }}>
            <InputLabel id="supplier" style={{ marginTop: "-7px" }}>Proveedor</InputLabel>
            <Select
              size="small"
              labelId="supplier"
              id="supplier"
              value={packingsPayload.supplier}
              label="Unidad de medida"
              required
              onChange={(ev) => setPackingsPayload({ ...packingsPayload, supplier: ev.target.value })}
            >
              {suppliers.map((_, item) => (
                <MenuItem key={suppliers[item]._id} value={suppliers[item]._id}>{suppliers[item].name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            value={packingsPayload.code}
            onChange={(ev) => setPackingsPayload({ ...packingsPayload, code: ev.target.value })}
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
            value={packingsPayload.name}
            onChange={(ev) => setPackingsPayload({ ...packingsPayload, name: ev.target.value })}
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
            value={packingsPayload.description}
            onChange={(ev) => setPackingsPayload({ ...packingsPayload, description: ev.target.value })}
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
            value={packingsPayload.entered_amount}
            onChange={(ev) => setPackingsPayload({ ...packingsPayload, entered_amount: Number(ev.target.value) })}
            margin="normal"
            required
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            id="entered_amount"
            label="Cantidad ingresada"
            name="entered_amount"
            size="small"
          />
          <TextField
            value={packingsPayload.purchase_price}
            onChange={(ev) => setPackingsPayload({ ...packingsPayload, purchase_price: Number(ev.target.value) })}
            margin="normal"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            id="purchase_price"
            label="Precio de compra"
            name="purchase_price"
            size="small"
          />
          {mode === "edit" ?
            <FormControl fullWidth style={{ marginTop: "14px" }}>
              <InputLabel id="status" style={{ marginTop: "-7px" }}>Estado</InputLabel>
              <Select
                size="small"
                labelId="status"
                id="status"
                value={packingsPayload.status}
                label="Estado"
                required
                onChange={(ev) => setPackingsPayload({ ...packingsPayload, status: ev.target.value })}
              >
                <MenuItem value="in stock">En stock</MenuItem>
                <MenuItem value="on order">En orden</MenuItem>
              </Select>
            </FormControl>
            : <></>
          }
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 1, ml: 2 }}>
          <Button
            variant="contained"
            type="button"
            sx={{ mr: 1 }}
            LinkComponent={NavLink} to={`/packings`}
          >
            Volver
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={async () => submit()}
            disabled={isValidPackingsPayload() || isCodeRepit || isNameRepit}
            >
            Guardar
          </Button>
        </Box>
      </Grid>
    )
  }

FormPackings.propTypes = {
  mode: PropTypes.string,
  units: PropTypes.array,
  suppliers: PropTypes.array,
  packingsPayload: PropTypes.object,
  setPackingsPayload: PropTypes.func,
  checkCodeOrNameExists: PropTypes.func,
  isCodeRepit: PropTypes.bool,
  isNameRepit: PropTypes.bool,
  isValidPackingsPayload: PropTypes.func,
  submit: PropTypes.func,
};

export default FormPackings;