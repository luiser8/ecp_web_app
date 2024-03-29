import React from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const FormOtherExpenses =
  ({
    mode,
    categories,
    otherExpensesPayload,
    setOtherExpensesPayload,
    checkCodeOrNameExists,
    isCodeRepit,
    isNameRepit,
    isValidOtherExpensesPayload,
    submit,
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
              value={otherExpensesPayload.category}
              label="Categoría"
              required
              onChange={(ev) => setOtherExpensesPayload({ ...otherExpensesPayload, category: ev.target.value })}
            >
              {Object.keys(categories).length !== 0 ?
                (
                  categories.map((_, item) => (
                    <MenuItem key={categories[item]._id} value={categories[item]._id}>{categories[item].name}</MenuItem>
                  ))
                ) : (
                  <MenuItem value={0}>Cargando...</MenuItem>
                )}
            </Select>
          </FormControl>
          <TextField
            value={otherExpensesPayload.code}
            onChange={(ev) => setOtherExpensesPayload({ ...otherExpensesPayload, code: ev.target.value })}
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
            disabled={isValidOtherExpensesPayload() || isCodeRepit || isNameRepit}
          >
            Guardar
          </Button>
        </Box>
      </Grid>
    )
  }

FormOtherExpenses.propTypes = {
  mode: PropTypes.string,
  categories: PropTypes.array,
  otherExpensesPayload: PropTypes.object,
  setOtherExpensesPayload: PropTypes.func,
  checkCodeOrNameExists: PropTypes.func,
  isCodeRepit: PropTypes.bool,
  isNameRepit: PropTypes.bool,
  isValidOtherExpensesPayload: PropTypes.func,
  submit: PropTypes.func,
};

export default FormOtherExpenses;