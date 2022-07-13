import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import Page from '../../components/layouts/Page';

const Details = () => {
  let { id } = useParams();

  return (
    <Page title="Productos">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Productos / Detalles
        </Typography>
      </Stack>
    </Page>
  )
}

export default Details;