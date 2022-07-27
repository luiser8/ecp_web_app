import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid, List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import { Box } from '@mui/system';

const FormResume = ({ productPayload, productMaterialResume }) => {
    return (
        <Grid component="div" container>
            <Box component="div" noValidate sx={{ width: '40%', pl: 2 }} >
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Información del producto a crear
                        </ListSubheader>
                    }
                >
                    <Divider />
                    <ListItem>
                        <ListItemText primary={`Código: ${productPayload.code}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`Nombre: ${productPayload.name}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`Descripción: ${productPayload.description}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`Presentación: ${productPayload.presentation}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`Cajas por mezcla: ${productPayload.boxes_x_mix}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`Unidades por mezcla: ${productPayload.units_x_mix}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`Margen de ganancia: ${productPayload.margin_of_gain}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`PVP por cajas: ${productPayload.pvp_x_boxes}`} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={`PVP por unidades: ${productPayload.pvp_x_units}`} />
                    </ListItem>
                </List>
            </Box>
            <Box component="div" noValidate sx={{ width: '60%', pl: 2 }}>
                <List
                    sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Información de materias primas
                        </ListSubheader>
                    }
                >
                <Divider />
                {productMaterialResume.map((item, key) => (
                    <ListItem key={key}>
                        <ListItemText primary={`Item: ${item.code}`} />
                        <ListItemText primary={`Material: ${item.name}`} />
                        <ListItemText primary={`Cantidad por mezcla: ${item.qty_x_mix}`} />
                        <ListItemText primary={`Costo por mezcla: ${item.cost_x_mix}`} />
                    </ListItem>
                ))}
                </List>
            </Box>
        </Grid>
    )
}

FormResume.propTypes = {
    productPayload: PropTypes.object,
    productMaterialResume: PropTypes.array,
};

export default FormResume;
