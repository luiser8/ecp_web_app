import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import moment from 'moment';

const ListPackingsDetail = ({ packings_kits }) => {
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
                                    Unidad de medida {` — ${packings_kits.unit.name} (${packings_kits.unit.code})`}
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Proveedor {` — ${packings_kits.supplier.name}`} ver detalle
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Nombre {` — ${packings_kits.name}`}
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Descripción {` — ${packings_kits.description}`}
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Estado {` — ${packings_kits.status === "in stock" ? "En stock" : "Finalizado"}`}
                                </Typography>
                            </Fragment>
                        </>
                    }
                />
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
                                    Cantidad ingresada  {` — ${packings_kits.entered_amount}`}
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Cantidad actual  {` — ${packings_kits.current_amount}`}
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Precio de compra {` — ${packings_kits.purchase_price}`}
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Fecha de ingreso {` — ${moment(packings_kits.createdAt).format("DD-MM-YYYY")}`}
                                </Typography>
                            </Fragment>
                        </>
                    }
                />
            </ListItem>
        </List>
    )
}

ListPackingsDetail.propTypes = {
    packings_kits: PropTypes.object,
};

export default ListPackingsDetail;