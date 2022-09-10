import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../../auth/Context';
import EmptyResponse from '../../../components/alerts/EmptyResponse';
import Page from '../../../components/layouts/Page';
import { getPackingKitByIdService, getPackingKitWithProducts } from '../../../services/packingkitService';
import TableProductSimple from '../../products/tables/TableProductSimple';
import ListPackingsDetail from '../lists/ListPackingsDetail';

const DetailsPackingsScreen = () => {
  const { checkUser } = useContext(Context);
  const userToken = checkUser().accesstoken;
  let { id } = useParams();
  const [packing_kits, setPacking_kits] = useState({});
  const [packing_kitsWithProducts, setPacking_kitsWithProducts] = useState([]);

  const columns = [
    { id: 1, name: 'Cod', color: '#e3f2fd' },
    { id: 2, name: 'Nombre', color: '#e3f2fd' },
    { id: 3, name: 'Presentación', color: '#e3f2fd' },
    { id: 4, name: 'Estatus', color: '#e3f2fd' },
    { id: 5, name: 'Fecha', color: '#e3f2fd' },
  ];

  const getPacking_kits = async () => {
    setPacking_kits(await getPackingKitByIdService(id, userToken));
  }

  const getPacking_kitsWithProd = async () => {
    setPacking_kitsWithProducts(await getPackingKitWithProducts(id, userToken));
  }

  useEffect(() => {
    getPacking_kits();
    getPacking_kitsWithProd();
    return () => {
      setPacking_kits({});
      setPacking_kitsWithProducts([]);
    };
  }, []);

  return (
    <Fragment>
      {(Object.keys(packing_kits).length !== 0) ?
        <Page title={`Herramientas de embalaje - ${packing_kits.code}`}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={-2} mt={-1}>
            <Typography variant="h4" gutterBottom>
              Herramientas de embalaje / Detalles / {packing_kits.code}
            </Typography>
          </Stack>
          <ListPackingsDetail
            packings_kits={packing_kits}
          />
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
            <Typography variant="h6" gutterBottom>Utilizado en productos</Typography>
          </Stack>
          <TableProductSimple
            columns={columns}
            rows={packing_kitsWithProducts}
          />
        </Page>
        :
        <EmptyResponse title="Herramientas de embalaje" />
      }
    </Fragment>
  )
}

export default DetailsPackingsScreen;
