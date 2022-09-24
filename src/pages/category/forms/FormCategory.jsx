import React from 'react';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid,  InputLabel,  MenuItem,  Radio,  RadioGroup,  Select,  TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const FormCategory =
  ({
    mode,
    dads,
    categoryPayload,
    setCategoryPayload,
    checkCodeOrNameExists,
    isNameRepit,
    isValidCategoryPayload,
    submit,
  }) => {
    return (
      <Grid component="div">
        <Box component="form" noValidate sx={{ width: '60%', pl: 2 }}>
          <FormControl fullWidth style={{ marginTop: "14px" }}>
              <InputLabel id="dad" style={{ marginTop: "-7px" }}>Categoría padre</InputLabel>
              <Select
                size="small"
                labelId="dad"
                id="dad"
                value={categoryPayload.dad}
                label="Categoría padre"
                required
                onChange={(ev) => setCategoryPayload({ ...categoryPayload, dad: ev.target.value })}
              >
                {dads.map((_, item) => (
                  <MenuItem key={dads[item].id} value={dads[item].name}>{dads[item].view}</MenuItem>
                ))}
              </Select>
            </FormControl>
          <TextField
            value={categoryPayload.name}
            onChange={(ev) => setCategoryPayload({ ...categoryPayload, name: ev.target.value })}
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
            value={categoryPayload.description}
            onChange={(ev) => setCategoryPayload({ ...categoryPayload, description: ev.target.value })}
            margin="normal"
            required
            type="text"
            fullWidth
            id="description"
            label="Descripción"
            name="description"
            size="small"
          />
          {mode === "edit" ?
            <FormControl fullWidth style={{ marginTop: "14px" }}>
              <InputLabel id="status" style={{ marginTop: "-7px" }}>Estado</InputLabel>
              <Select
                size="small"
                labelId="status"
                id="status"
                value={categoryPayload.status}
                label="Estado"
                required
                onChange={(ev) => setCategoryPayload({ ...categoryPayload, status: ev.target.value })}
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
            LinkComponent={NavLink} to={`/categories`}
          >
            Volver
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={async () => submit()}
            disabled={isValidCategoryPayload() || isNameRepit}
          >
            Guardar
          </Button>
        </Box>
      </Grid>
    )
  }

  FormCategory.propTypes = {
  mode: PropTypes.string,
  dads: PropTypes.array,
  categoryPayload: PropTypes.object,
  setCategoryPayload: PropTypes.func,
  checkCodeOrNameExists: PropTypes.func,
  isNameRepit: PropTypes.bool,
  isValidCategoryPayload: PropTypes.func,
  submit: PropTypes.func,
};

export default FormCategory;