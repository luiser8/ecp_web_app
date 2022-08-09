import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import moment from 'moment';

const ListMaterialDetail = ({ material }) => {
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
                                    Categoría {` — ${material.category.name}`}
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Unidad de medida {` — ${material.unit.name} (${material.unit.code})`}
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Proveedor {` — ${material.supplier.name}`} ver detalle
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Nombre {` — ${material.name}`}
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Descripción {` — ${material.description}`}
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Estado {` — ${material.status === "in stock" ? "En stock" : "Finalizado"}`}
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
                                    Cantidad ingresada  {` — ${material.entered_amount}`}
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Cantidad actual  {` — ${material.current_amount}`}
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Precio de compra {` — ${material.purchase_price}`}
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Fecha de ingreso {` — ${moment(material.createdAt).format("DD-MM-YYYY")}`}
                                </Typography>
                            </Fragment>
                            <Fragment>
                                <Typography
                                    sx={{ display: 'block', fontWeight: "bold" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Fecha de expiración {` — ${moment(material.expiration_date).format("DD-MM-YYYY")}`}
                                </Typography>
                            </Fragment>
                        </>
                    }
                />
            </ListItem>
        </List>
    )
}

ListMaterialDetail.propTypes = {
    material: PropTypes.object,
};

export default ListMaterialDetail;