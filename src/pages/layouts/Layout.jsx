import React, { useState, useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Context } from '../../auth/Context';
import Navigator from '../../components/layouts/Navigator';
import Header from '../../components/layouts/Header';
import Copyright from '../../components/layouts/Copyright';
import Theme from '../../themes/theme';
import RoutesCustom from '../../helpers/RoutesCustom';
import Login from '../user/Login';
import DialogCustomSession from '../../components/dialogs/DialogCustomSession';
const drawerWidth = 265;

const Layout = () => {
    const { checkUser, openSessionExpired, setOpenSessionExpired  } = useContext(Context);
    const [mobileOpen, setMobileOpen] = useState(false);
    const isSmUp = useMediaQuery(Theme().theme.breakpoints.up('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

  const showSessionExpired = () => {
     return (
       <DialogCustomSession
         open={openSessionExpired}
         setOpen={setOpenSessionExpired}
       />
     )
   }

    return (
        <ThemeProvider theme={Theme().theme}>
            <CssBaseline />
            {(checkUser().userId) !== null ?
                <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                    <Box
                        component="nav"
                        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    >
                        {isSmUp ? null : (
                            <Navigator
                                PaperProps={{ style: { width: drawerWidth } }}
                                variant="temporary"
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                            />
                        )}
                        <Navigator
                            PaperProps={{ style: { width: drawerWidth } }}
                            sx={{ display: { sm: 'block', xs: 'none' } }}
                        />
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Header onDrawerToggle={handleDrawerToggle} />
                        <Box component="main" sx={{ flex: 1, py: 3, px: 3, }}>
                            <RoutesCustom />
                        </Box>
                        <Box component="footer" sx={{ p: 2}}>
                            <Copyright />
                        </Box>
                    </Box>
                    {/*Session expired*/}
                    {openSessionExpired ? showSessionExpired() : null}
                </Box>
                :
                <Login />
            }
        </ThemeProvider>
    );
}

export default Layout;