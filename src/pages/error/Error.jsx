import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { styled } from '@mui/material/styles';
import Page from '../../components/layouts/Page';

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '70vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0)
  }));

const Error = () => {
    return (
        <Page title="404 Pagina no encontrada">
            <Container>
                <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
                    <Typography variant="h3" paragraph>
                        Lo sentimos, página no encontrada!
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                    Lo sentimos, no pudimos encontrar la página que estás buscando. ¿Quizás has escrito mal la URL? Asegúrese de revisar su ortografía
                    </Typography>
                    <Button to="/" sx={{ mt: 2 }} size="large" variant="contained" component={RouterLink}>
                        Volver
                    </Button>
                </ContentStyle>
            </Container>
        </Page>
    )
}

export default Error;
