import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../../auth/Context';
import EmptyResponse from '../../../components/alerts/EmptyResponse';
import Page from '../../../components/layouts/Page';
import { getSupplierByIdService } from '../../../services/supplierService';
import ListSupplierDetail from '../lists/ListSupplierDetail';

const DetailsSuppliersScreen = () => {
  const { checkUser, setOpenSessionExpired } = useContext(Context);
  const userToken = checkUser().accesstoken;
  let { id } = useParams();
  const [supplier, setSupplier] = useState({});

  const getSupplier = async (userToken) => {
    const { data, error } = await getSupplierByIdService(id, userToken);
    if (error === "Invalid Token") {
      setOpenSessionExpired(true);
    }
    if (data !== undefined || null) {
      setSupplier(data );
    }
  }

  useEffect(() => {
    getSupplier(userToken);
    return () => {
      setSupplier({});
    };
  }, []);

  return (
    <Fragment>
      {(Object.keys(supplier).length !== 0) ?
        <Page title={`Proveedor - ${supplier.identifier}`}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={-2} mt={-1}>
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
