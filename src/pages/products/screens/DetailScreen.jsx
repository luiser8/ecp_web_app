import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../../auth/Context';
import { getProductById } from '../../../services/productsService';
import Page from '../../../components/layouts/Page';
import ListProductDetail from '../lists/ListProductDetail';
import TableProductDetail from '../tables/TableProductDetail';

const DetailsScreen = () => {
  const { checkUser } = useContext(Context);
  const userToken = checkUser().accesstoken;
  let { id } = useParams();
  const [product, setProduct] = useState([]);

  const columns = [
    { id: 1, name: 'Cod', color: '#e3f2fd' },
    { id: 2, name: 'Materia prima', color: '#e3f2fd' },
    { id: 3, name: 'UM', color: '#e3f2fd' },
    { id: 4, name: 'Cant x mezcla', color: '#e3f2fd' },
    { id: 5, name: 'Costo x mezcla', color: '#e3f2fd' },
    { id: 6, name: 'Costo U x mezcla', color: '#e3f2fd' },
    { id: 4, name: 'Cant x caja', color: '#e3f2fd' },
    { id: 5, name: 'Costo x caja', color: '#e3f2fd' },
    { id: 6, name: 'Cant x U', color: '#e3f2fd' },
    { id: 6, name: 'Costo x U', color: '#e3f2fd' },
  ];

  const getProduct = async () => {
    (Promise.all([
      getProductById(id, userToken).then((values) => {
        if (values !== null) {
          setProduct(values !== undefined ? values : []);
        }
      }),
    ]).catch(error => {
      new Error(error);
    }));
  }

  useEffect(() => {
    getProduct();
    return () => {
      setProduct([]);
    };
  }, []);

  return (
    <Page title={`Producto - ${product.code}`}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
        <Typography variant="h4" gutterBottom>
          Productos / Detalles / {product.code}
        </Typography>
      </Stack>
        <ListProductDetail 
          product={product} 
        />
        <TableProductDetail 
          columns={columns} 
          rows={product} 
        />
    </Page>
  )
}

export default DetailsScreen;
