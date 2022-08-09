import React from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const FormMaterial =
  ({
    mode,
    category,
    units,
    suppliers,
    materialPayload,
    setMaterialPayload,
    checkCodeOrNameExists,
    isCodeRepit,
    isNameRepit,
    isValidMaterialPayload,
    submit
  }) => {
    return (
      <Grid component="div">
        <Box component="form" noValidate sx={{ width: '60%', pl: 2 }}>
          <FormControl fullWidth style={{ marginTop: "14px" }}>
            <InputLabel id="category" style={{ marginTop: "-7px" }}>Categoría</InputLabel>
            <Select
              size="small"
              labelId="category"
              id="category"
              value={materialPayload.category}
              label="Categoría"
              required
              onChange={(ev) => setMaterialPayload({ ...materialPayload, category: ev.target.value })}
            >
              {category.map((_, item) => (
                <MenuItem key={category[item]._id} value={category[item]._id}>{category[item].name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ marginTop: "14px" }}>
            <InputLabel id="unit" style={{ marginTop: "-7px" }}>Unidad de medida</InputLabel>
            <Select
              size="small"
              labelId="unit"
              id="unit"
              value={materialPayload.unit}
              label="Unidad de medida"
              required
              onChange={(ev) => setMaterialPayload({ ...materialPayload, unit: ev.target.value })}
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
              value={materialPayload.supplier}
              label="Unidad de medida"
              required
              onChange={(ev) => setMaterialPayload({ ...materialPayload, supplier: ev.target.value })}
            >
              {suppliers.map((_, item) => (
                <MenuItem key={suppliers[item]._id} value={suppliers[item]._id}>{suppliers[item].name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            value={materialPayload.code}
            onChange={(ev) => setMaterialPayload({ ...materialPayload, code: ev.target.value })}
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
            value={materialPayload.name}
            onChange={(ev) => setMaterialPayload({ ...materialPayload, name: ev.target.value })}
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
            value={materialPayload.description}
            onChange={(ev) => setMaterialPayload({ ...materialPayload, description: ev.target.value })}
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
            value={materialPayload.entered_amount}
            onChange={(ev) => setMaterialPayload({ ...materialPayload, entered_amount: Number(ev.target.value) })}
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
            value={materialPayload.purchase_price}
            onChange={(ev) => setMaterialPayload({ ...materialPayload, purchase_price: Number(ev.target.value) })}
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
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Fecha de caducidad"
              value={materialPayload.expiration_date}
              disablePast
              onChange={(ev) => setMaterialPayload({ ...materialPayload, expiration_date: ev })}
              renderInput={(params) =>
                <TextField {...params}
                  margin="normal"
                  type="date"
                  fullWidth
                  id="expiration_date"
                  name="expiration_date"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />}
            />
          </LocalizationProvider>
          {mode === "edit" ?
            <FormControl fullWidth style={{ marginTop: "14px" }}>
              <InputLabel id="status" style={{ marginTop: "-7px" }}>Estado</InputLabel>
              <Select
                size="small"
                labelId="status"
                id="status"
                value={materialPayload.status}
                label="Estado"
                required
                onChange={(ev) => setMaterialPayload({ ...materialPayload, status: ev.target.value })}
              >
                <MenuItem value="in stock">En stock</MenuItem>
                <MenuItem value="on order">En orden</MenuItem>
                <MenuItem value="exhausted">Agotado</MenuItem>
                <MenuItem value="other">Otro</MenuItem>
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
            LinkComponent={NavLink} to={`/materials`}
          >
            Volver
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={async () => submit()}
            disabled={isValidMaterialPayload() || isCodeRepit || isNameRepit}
            >
            Guardar
          </Button>
        </Box>
      </Grid>
    )
  }

FormMaterial.propTypes = {
  mode: PropTypes.string,
  category: PropTypes.array,
  units: PropTypes.array,
  suppliers: PropTypes.array,
  materialPayload: PropTypes.object,
  setMaterialPayload: PropTypes.func,
  checkCodeOrNameExists: PropTypes.func,
  isCodeRepit: PropTypes.bool,
  isNameRepit: PropTypes.bool,
  isValidMaterialPayload: PropTypes.func,
  submit: PropTypes.func,
};

export default FormMaterial;