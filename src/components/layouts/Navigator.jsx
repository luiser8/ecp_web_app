import React, { forwardedRef } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import SettingsIcon from '@mui/icons-material/Settings';
import { Factory } from '@mui/icons-material';

const categories = [
  {
    id: 'Producción',
    children: [
      {
        id: 'Productos',
        path: '/',
        icon: <Factory />,
        active: true,
      },
      { id: 'Categorías', path: '/category',  icon:  <DnsRoundedIcon /> },
      { id: 'Storage', path: '/st',  icon:  <PermMediaOutlinedIcon /> },
      {
        id: 'Machine learning',
        icon: <SettingsInputComponentIcon />,
      },
    ],
  },
  {
    id: 'Ajustes',
    children: [
      { id: 'Analytics',  path: '/settings',  icon: <SettingsIcon /> },
    ],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
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
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, path }) => (
              <ListItem disablePadding key={childId}>
                <CustomListItem to={`${path}`} icon={icon} child={childId} sx={item}/>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
