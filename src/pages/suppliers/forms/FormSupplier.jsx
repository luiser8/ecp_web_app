import React from 'react';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid,  InputLabel,  MenuItem,  Radio,  RadioGroup,  Select,  TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const FormSupplier =
  ({
    mode,
    supplierPayload,
    setSupplierPayload,
    checkCodeOrNameExists,
    isIdRepit,
    isNameRepit,
    isEmailRepit,
    isPhoneRepit,
    isValidSupplierPayload,
    submit,
  }) => {
    return (
      <Grid component="div">
        <Box component="form" noValidate sx={{ width: '60%', pl: 2 }}>
        <FormControl>
          <FormLabel id="type">Tipo</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={supplierPayload.type}
            onChange={(ev) => setSupplierPayload({ ...supplierPayload, type: ev.target.value })}
          >
            <FormControlLabel value="natural" control={<Radio />} label="Persona natural" />
            <FormControlLabel value="juridico" control={<Radio />} label="Persona jurídica" />
          </RadioGroup>
        </FormControl>
          <TextField
            value={supplierPayload.identifier}
            onChange={(ev) => setSupplierPayload({ ...supplierPayload, identifier: ev.target.value })}
            onKeyUp={(ev) => checkCodeOrNameExists('identifier', ev.target.value)}
            margin="normal"
            required
            error={isIdRepit}
            helperText={isIdRepit ? "Identificador repetido" : ""}
            type="text"
            fullWidth
            id="identifier"
            label={isIdRepit ? "Error" : "Identificador"}
            name="identifier"
            size="small"
            sx={{ marginBottom: isIdRepit ? -1 : 1 }}
          />
          <TextField
            value={supplierPayload.name}
            onChange={(ev) => setSupplierPayload({ ...supplierPayload, name: ev.target.value })}
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
            value={supplierPayload.description}
            onChange={(ev) => setSupplierPayload({ ...supplierPayload, description: ev.target.value })}
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
            value={supplierPayload.email}
            onChange={(ev) => setSupplierPayload({ ...supplierPayload, email: ev.target.value })}
            onKeyUp={(ev) => checkCodeOrNameExists('email', ev.target.value)}
            margin="normal"
            required
            error={isEmailRepit}
            helperText={isEmailRepit ? "Email repetido" : ""}
            type="text"
            fullWidth
            id="email"
            label={isEmailRepit ? "Error" : "Email"}
            name="email"
            size="small"
            sx={{ marginBottom: isEmailRepit ? -1 : 1 }}
          />
          <TextField
            value={supplierPayload.phone}
            onChange={(ev) => setSupplierPayload({ ...supplierPayload, phone: ev.target.value })}
            onKeyUp={(ev) => checkCodeOrNameExists('phone', ev.target.value)}
            margin="normal"
            required
            error={isPhoneRepit}
            helperText={isPhoneRepit ? "Teléfono repetido" : ""}
            type="text"
            fullWidth
            id="phone"
            label={isPhoneRepit ? "Error" : "Teléfono"}
            name="phone"
            size="small"
            sx={{ marginBottom: isPhoneRepit ? -1 : 1 }}
          />
          <TextField
            value={supplierPayload.address}
            onChange={(ev) => setSupplierPayload({ ...supplierPayload, address: ev.target.value })}
            margin="normal"
            type="text"
            fullWidth
            id="address"
            label="Dirección"
            name="address"
            size="small"
          />
          {mode === "edit" ?
            <FormControl fullWidth style={{ marginTop: "14px" }}>
              <InputLabel id="status" style={{ marginTop: "-7px" }}>Estado</InputLabel>
              <Select
                size="small"
                labelId="status"
                id="status"
                value={supplierPayload.status}
                label="Estado"
                required
                onChange={(ev) => setSupplierPayload({ ...supplierPayload, status: ev.target.value })}
              >
                <MenuItem value={true}>Activo</MenuItem>
                <MenuItem value={false}>Inactivo</MenuItem>
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
            LinkComponent={NavLink} to={`/suppliers`}
          >
            Volver
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={async () => submit()}
            disabled={isValidSupplierPayload() || isIdRepit || isNameRepit || isEmailRepit || isPhoneRepit}
          >
            Guardar
          </Button>
        </Box>
      </Grid>
    )
  }

FormSupplier.propTypes = {
  mode: PropTypes.string,
  supplierPayload: PropTypes.object,
  setSupplierPayload: PropTypes.func,
  checkCodeOrNameExists: PropTypes.func,
  isIdRepit: PropTypes.bool,
  isNameRepit: PropTypes.bool,
  isEmailRepit: PropTypes.bool,
  isPhoneRepit: PropTypes.bool,
  isValidSupplierPayload: PropTypes.func,
  submit: PropTypes.func,
};

export default FormSupplier;