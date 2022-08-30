import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../../auth/Context';
import EmptyResponse from '../../../components/alerts/EmptyResponse';
import Page from '../../../components/layouts/Page';
import { getProductByIdService } from '../../../services/productsService';
import ListProductDetail from '../lists/ListProductDetail';
import TableProductDetail from '../tables/TableProductDetail';

const DetailsProductScreen = () => {
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
    setProduct(await getProductByIdService(id, userToken));
  }

  useEffect(() => {
    getProduct();
    return () => {
      setProduct([]);
    };
  }, []);

  return (
    <Fragment>
      {(Object.keys(product).length !== 0) ?
        <Page title={`Producto - ${product.code}`}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
            <Typography variant="h4" gutterBottom>
              Productos / Detalles / {product.code}
            </Typography>
          </Stack>
          {(Object.keys(product).length !== 0) ?
            <>
              <ListProductDetail
                product={product}
              />
              <TableProductDetail
                columns={columns}
                rows={product}
              />
            </> : <></>
          }
        </Page>
        :
        <EmptyResponse title="Producto" />
      }
    </Fragment>
  )
}

export default DetailsProductScreen;
