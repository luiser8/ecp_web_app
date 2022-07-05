import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material/styles';
import Copyright from '../layouts/Copyright';
import Theme from '../../themes/theme';
import { Context } from '../../auth/Context';
import { loginUser } from '../../services/userService';
import { CircularProgress } from '@mui/material';

const Login = () => {
    const { login } = useContext(Context);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);
    const [errorMsj, setErrorMsj] = useState('');
    const [errorMsjContent, setErrorMsjContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault(); setLoading(true);
        (Promise.all([
            loginUser(username, password).then((user) => {
                if (user !== undefined) {
                    if (user.length !== 0) {
                        login({
                            'userId': user.userId !== undefined ? user.userId : '',
                            'firstname': user.firstname !== undefined ? user.firstname : '',
                            'lastname': user.lastname !== undefined ? user.lastname : '',
                            'rolname': user.role.name !== undefined ? user.role.name : '',
                            'accesstoken': user.accesstoken !== undefined ? user.accesstoken : '',
                            'refreshtoken': user.refreshtoken !== undefined ? user.refreshtoken : ''
                        });
                    }
                    return;
                }
                setError(true); 
                setErrorMsj('Error iniciando sesión.'); 
                setErrorMsjContent('Pueda que estés colocando algunos datos equivocados. Por favor verifica.');
            }),
        ]).catch(error => {
            new Error(error);
        }));
        setLoading(false);
        setError(false); 
        setErrorMsj(''); 
        setErrorMsjContent('');
    };

    return (
        <ThemeProvider theme={Theme().theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(login_image.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 22,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Iniciar sesión
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
                            <TextField
                                value={username}
                                onChange={(ev) => setUsername(ev.target.value)}
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Usuario"
                                name="username"
                                autoFocus
                                error={error}
                            />
                            <TextField
                                value={password}
                                onChange={(ev) => setPassword(ev.target.value)}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                error={error}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Recuérdeme"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={username !== '' && password !== '' ? false : true}
                            >
                                Iniciar sesión
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Olvido su contraseña?
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                        {loading ? (
                            <Box sx={{ display: 'flex', marginTop: '60px' }}>
                                <CircularProgress />
                            </Box>
                        ) : (<></>)}
                        {error ? (
                        <Stack sx={{ minWidth: '41.5%' }} spacing={2} position="fixed" style={{ flexShrink: 0, top: 'auto', bottom: 0 }}>
                            <Alert severity="error" square>
                                <AlertTitle>{errorMsj}</AlertTitle>
                                <strong>{errorMsjContent}</strong>
                            </Alert>
                        </Stack>
                        ) : (
                            <></>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Login;