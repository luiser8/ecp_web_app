import React, { forwardedRef } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';

const categories = [
  {
    id: 'Producción',
    children: [
      { id: 'Productos', path: '/', icon: <LocalOfferOutlinedIcon />, active: true, },
      { id: 'Resumen de requerimientos', path: '/requirements',  icon:  <BarChartOutlinedIcon /> },
    ],
  },
  {
    id: 'Inventario',
    children: [
      { id: 'Materia prima', path: '/materials',  icon:  <InventoryOutlinedIcon /> },
      { id: 'Herramientas para embalaje', path: '/packings',  icon:  <ContentCutOutlinedIcon /> },
      { id: 'Otros gastos', path: '/otherexpenses',  icon:  <TrendingDownOutlinedIcon /> },
    ],
  },
  {
    id: 'Ajustes',
    children: [
      { id: 'Categorías', path: '/categories',  icon:  <CategoryOutlinedIcon /> },
      { id: 'Proveedores', path: '/suppliers',  icon:  <GroupOutlinedIcon /> },
    ],
  },
];

const item = {
  py: '1px',
  px: 2,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1,
  px: 2,
};

export default function Navigator(props) {
  const { ...other } = props;
  const location = useLocation();

  const CustomListItem = ({ to, icon, child }) => (
      <ListItem
        ref={forwardedRef}
        button
        component={NavLink}
        to={to}
        selected={to === location.pathname}
        sx={{color: '#fff'}}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText sx={{ color: '#fff' }} style={{ color: 'inherit', textDecoration: 'inherit'}}>
          {child}
        </ListItemText>
      </ListItem>
  )

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <NavLink to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>
          <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>ECP web</ListItem>
        </NavLink>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 1, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, path }) => (
              <ListItem disablePadding key={childId}>
                <CustomListItem to={path} icon={icon} child={childId} sx={item}/>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
