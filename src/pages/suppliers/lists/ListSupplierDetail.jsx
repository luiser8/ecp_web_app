import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import moment from 'moment';

const ListSupplierDetail = ({ supplier }) => {
    return (
        <List sx={{ width: '90%', maxWidth: '100%', bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start" sx={{ paddingLeft: '0px' }}>
                <ListItemText
                    secondary={
                        <>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Identificador {` — ${supplier.identifier}`}
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Tipo {` — ${supplier.type}`}
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Nombre {` — ${supplier.name}`}
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Descripción {` — ${supplier.description}`}
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Email {` — ${supplier.email}`}
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Teléfono {` — ${supplier.phone}`}
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Dirección {` — ${supplier.address}`}
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Estado {` — ${supplier.status ? "Activo" : "Inactivo"}`}
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Fecha {` — ${moment(supplier.createdAt).format("DD-MM-YYYY")}`}
                                </Typography>
                            </Fragment>
                        </>
                    }
                />
            </ListItem>
        </List>
    )
}

ListSupplierDetail.propTypes = {
    supplier: PropTypes.object,
};

export default ListSupplierDetail;