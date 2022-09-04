import React from 'react';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid,  InputLabel,  MenuItem,  Radio,  RadioGroup,  Select,  TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const FormOtherExpenses =
  ({
    mode,
    otherExpensesPayload,
    setOtherExpensesPayload,
    checkCodeOrNameExists,
    isNameRepit,
    isValidOtherExpensesPayload,
    submit,
  }) => {
    return (
      <Grid component="div">
        <Box component="form" noValidate sx={{ width: '60%', pl: 2 }}>
          <TextField
            value={otherExpensesPayload.name}
            onChange={(ev) => setOtherExpensesPayload({ ...otherExpensesPayload, name: ev.target.value })}
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
            value={otherExpensesPayload.description}
            onChange={(ev) => setOtherExpensesPayload({ ...otherExpensesPayload, description: ev.target.value })}
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
                value={otherExpensesPayload.status}
                label="Estado"
                required
                onChange={(ev) => setOtherExpensesPayload({ ...otherExpensesPayload, status: ev.target.value })}
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
            LinkComponent={NavLink} to={`/otherexpenses`}
          >
            Volver
          </Button>
          <Button
            variant="contained"
            type="button"
            onClick={async () => submit()}
            disabled={isValidOtherExpensesPayload() || isNameRepit}
          >
            Guardar
          </Button>
        </Box>
      </Grid>
    )
  }

FormOtherExpenses.propTypes = {
  mode: PropTypes.string,
  otherExpensesPayload: PropTypes.object,
  setOtherExpensesPayload: PropTypes.func,
  checkCodeOrNameExists: PropTypes.func,
  isNameRepit: PropTypes.bool,
  isValidOtherExpensesPayload: PropTypes.func,
  submit: PropTypes.func,
};

export default FormOtherExpenses;