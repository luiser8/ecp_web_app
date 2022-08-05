import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../auth/Context';
import { getProductsSimple } from '../../services/productsService';
import { Button, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import Page from '../../components/layouts/Page';
import SpinnerCustom from '../../components/alerts/SpinnerCustom';
import TableProducts from './tables/TableProducts';

const Products = () => {
  const { checkUser } = useContext(Context);
  const userToken = checkUser().accesstoken;
  const [products, setProducts] = useState([]);
  //Paginación
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const columns = [
    { id: 1, name: 'Código', color: '#e3f2fd', align: 'left' },
    { id: 2, name: 'Nombre', color: '#e3f2fd', align: 'left' },
    { id: 3, name: 'Presentación', color: '#e3f2fd', align: 'left' },
    { id: 4, name: 'Estado', color: '#e3f2fd', align: 'left' },
    { id: 5, name: 'Fecha', color: '#e3f2fd', align: 'left' },
    { id: 6, name: 'Opciones', color: '#e3f2fd', align: 'right' },
  ];

  const getProducts = async () => {
    (Promise.all([
      getProductsSimple(userToken).then((values) => {
        if (values !== null) {
          setProducts(values !== undefined ? values : []);
        }
      }),
    ]).catch(error => {
      new Error(error);
    }));
  }

  useEffect(() => {
    getProducts();
    return () => {
      setProducts([]);
    };
  }, []);

  return (
    <Page title="Productos">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4" gutterBottom>
          Productos
        </Typography>
        <Button sx={{ bgcolor: 'primary.header' }} variant="contained" component={NavLink} to="/product/new" startIcon={<Add icon="eva:plus-fill" />}>
          Nuevo producto
        </Button>
      </Stack>
      {(Object.keys(products).length !== 0) ?
        <TableProducts
          columns={columns}
          rows={products}
          routing="/product/"
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
        /> : <SpinnerCustom />
      }
    </Page>
  )
}

export default Products;