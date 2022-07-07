import React, { useContext, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import { Context } from '../../auth/Context';
import { usePaths }  from '../../hooks/usePaths';

const Header = (props) => {
  const location = useLocation();
  const paths = usePaths();
  const headerName =  paths.filter(p => p.path === location.pathname)[0].Name;
  const { logout, checkUser } = useContext(Context);
  const { onDrawerToggle } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Fragment>
      <AppBar sx={{ bgcolor: '#01579b' }} position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center" mb={-5}>
            <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" onClick={(ev) => setAnchorEl(ev.currentTarget)} sx={{ p: 0 }}>
                <Avatar alt="My Avatar" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={() => setAnchorEl(null)}>{checkUser().firstname} {checkUser().lastname}</MenuItem>
                  <Divider />
                  <MenuItem onClick={() => setAnchorEl(null)}>Perfil</MenuItem>
                  <MenuItem onClick={async () => logout(null)}>Cerrar sesión</MenuItem>
                </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        position="static"
        elevation={0}
        sx={{ zIndex: 0, bgcolor: '#01579b' }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={0}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {headerName}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;