import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import moment from 'moment';

const ListProductDetail = ({ product }) => {
  return (
    <List sx={{ width: '90%', maxWidth: '100%', bgcolor: 'background.paper' }}>
    <ListItem alignItems="flex-start" sx={{ paddingLeft: '0px' }}>
      <ListItemAvatar sx={{ paddingRight: 1 }}>
        <Avatar alt="qr" sx={{ width: 90, height: 90 }} src={product.qr_code} />
      </ListItemAvatar>
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
              Nombre {` — ${product.name}`}
            </Typography>
          </Fragment>
          <Fragment>
          <Typography
            sx={{ display: 'block', fontWeight: "bold" }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            Descripción {` — ${product.description}`}
          </Typography>
        </Fragment>
        <Fragment>
          <Typography
            sx={{ display: 'block', fontWeight: "bold" }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            Presentación {` — ${product.presentation}`}
          </Typography>
        </Fragment>
        <Fragment>
          <Typography
            sx={{ display: 'block', fontWeight: "bold" }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            Estado {` — ${product.status === "in process" ? "En proceso" : "Finalizado" }`}
          </Typography>
        </Fragment>
        <Fragment>
          <Typography
            sx={{ display: 'block', fontWeight: "bold" }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            Fecha {` — ${moment(product.createdAt).format("DD-MM-YYYY")}`}
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
              Cajas por mezcla  {` — ${product.boxes_x_mix}`}
            </Typography>
          </Fragment>
          <Fragment>
            <Typography
              sx={{ display: 'block', fontWeight: "bold" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Unidades por mezcla  {` — ${product.units_x_mix}`}
            </Typography>
          </Fragment>
          <Fragment>
            <Typography
              sx={{ display: 'block', fontWeight: "bold" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Margen de ganancia {` — ${product.margin_of_gain}`}
            </Typography>
          </Fragment>
          <Fragment>
            <Typography
              sx={{ display: 'block', fontWeight: "bold" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              PVP por cajas {` — ${product.pvp_x_boxes}`}
            </Typography>
          </Fragment>
          <Fragment>
            <Typography
              sx={{ display: 'block', fontWeight: "bold" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              PVP por unidad {` — ${product.pvp_x_units}`}
            </Typography>
          </Fragment>
          </>
        }
      />
    </ListItem>
  </List>
  )
}

ListProductDetail.propTypes = {
    product: PropTypes.object,
};

export default ListProductDetail;