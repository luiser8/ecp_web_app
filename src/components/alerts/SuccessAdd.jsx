import React from 'react';
import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { styled } from '@mui/material/styles';

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '60vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0)
}));

const SuccessAdd = () => {
    return (
        <Container>
            <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
                <Typography variant="h4" paragraph>Has terminado!.</Typography>
                <Typography sx={{ color: 'text.secondary' }}>Todos los pasos completados satisfactoriamente.</Typography>
            </ContentStyle>
        </Container>
    )
}

export default SuccessAdd;
