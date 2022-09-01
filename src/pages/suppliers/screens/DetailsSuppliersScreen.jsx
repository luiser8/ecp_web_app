import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../../auth/Context';
import EmptyResponse from '../../../components/alerts/EmptyResponse';
import Page from '../../../components/layouts/Page';
import { getSupplierByIdService } from '../../../services/supplierService';
import ListSupplierDetail from '../lists/ListSupplierDetail';

const DetailsSuppliersScreen = () => {
  const { checkUser } = useContext(Context);
  const userToken = checkUser().accesstoken;
  let { id } = useParams();
  const [supplier, setSupplier] = useState({});

  const getSupplier = async () => {
    setSupplier(await getSupplierByIdService(id, userToken));
  }

  useEffect(() => {
    getSupplier();
    return () => {
      setSupplier({});
    };
  }, []);

  return (
    <Fragment>
      {(Object.keys(supplier).length !== 0) ?
        <Page title={`Proveedor - ${supplier.identifier}`}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
            <Typography variant="h4" gutterBottom>
              Proveedor / Detalles / {supplier.identifier}
            </Typography>
          </Stack>
          <ListSupplierDetail
            supplier={supplier}
          />
        </Page>
        :
        <EmptyResponse title="Proveedores" />
      }
    </Fragment>
  )
}

export default DetailsSuppliersScreen;
