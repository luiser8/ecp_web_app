import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { styled } from '@mui/material/styles';
import SpinnerCustom from '../../components/alerts/SpinnerCustom';

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '60vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0)
}));

const EmptyResponse = ({ title, subtitle = true }) => {
    const [spinnerLoading, setSpinnerLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSpinnerLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, [spinnerLoading]);

    return (
        <Container>
            {spinnerLoading ?
                <SpinnerCustom />
                :
                <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
                    <Typography variant="h4" paragraph>Lo sentimos, no encontramos {title} para mostrar.</Typography>
                    {subtitle ?
                     <Typography sx={{ color: 'text.secondary' }}>Intenta crear nuevos elementos {title}.</Typography> : <></>
                    }
                </ContentStyle>
            }
        </Container>
    )
}

EmptyResponse.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.bool
};

export default EmptyResponse;
