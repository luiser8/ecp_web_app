import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../../auth/Context';
import EmptyResponse from '../../../components/alerts/EmptyResponse';
import Page from '../../../components/layouts/Page';
import { getMaterialByIdService, getMaterialWithProducts } from '../../../services/materialsService';
import TableProductSimple from '../../products/tables/TableProductSimple';
import ListMaterialDetail from '../lists/ListMaterialDetail';

const DetailsMaterialScreen = () => {
  const { checkUser } = useContext(Context);
  const userToken = checkUser().accesstoken;
  let { id } = useParams();
  const [material, setMaterial] = useState({});
  const [materialWithProducts, setMaterialWithProducts] = useState([]);

  const columns = [
    { id: 1, name: 'Cod', color: '#e3f2fd' },
    { id: 2, name: 'Nombre', color: '#e3f2fd' },
    { id: 3, name: 'Presentación', color: '#e3f2fd' },
    { id: 4, name: 'Estatus', color: '#e3f2fd' },
    { id: 5, name: 'Fecha', color: '#e3f2fd' },
  ];

  const getMaterial = async () => {
    setMaterial(await getMaterialByIdService(id, userToken));
  }

  const getMaterialWithProd = async () => {
    setMaterialWithProducts(await getMaterialWithProducts(id, userToken));
  }

  useEffect(() => {
    getMaterial();
    getMaterialWithProd();
    return () => {
      setMaterial({});
      setMaterialWithProducts([]);
    };
  }, []);

  return (
    <Fragment>
      {(Object.keys(material).length !== 0) ?
        <Page title={`Materia prima - ${material.code}`}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={-2} mt={-1}>
            <Typography variant="h4" gutterBottom>
              Materia prima / Detalles / {material.code}
            </Typography>
          </Stack>
          <ListMaterialDetail
            material={material}
          />
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
            <Typography variant="h6" gutterBottom>Utilizado en productos</Typography>
          </Stack>
          <TableProductSimple
            columns={columns}
            rows={materialWithProducts}
          />
        </Page>
        :
        <EmptyResponse title="Materia prima" />
      }
    </Fragment>
  )
}

export default DetailsMaterialScreen;
