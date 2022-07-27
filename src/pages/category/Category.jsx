import { Stack, Typography } from '@mui/material';
import React from 'react';
import Page from '../../components/layouts/Page';

const Category = () => {
  return (
    <Page title="Categorías">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Categorías
        </Typography>
      </Stack>
    </Page>
  )
}

export default Category;