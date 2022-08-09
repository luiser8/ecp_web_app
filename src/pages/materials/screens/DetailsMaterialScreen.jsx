import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../../auth/Context';
import EmptyResponse from '../../../components/alerts/EmptyResponse';
import Page from '../../../components/layouts/Page';
import { getMaterialByIdService } from '../../../services/materialsService';
import ListMaterialDetail from '../lists/ListMaterialDetail';

const DetailsMaterialScreen = () => {
  const { checkUser } = useContext(Context);
  const userToken = checkUser().accesstoken;
  let { id } = useParams();
  const [material, setMaterial] = useState({});

  const getMaterial = async () => {
    setMaterial(await getMaterialByIdService(id, userToken));
  }

  useEffect(() => {
    getMaterial();
    return () => {
      setMaterial({});
    };
  }, []);

  return (
    <Fragment>
      {(Object.keys(material).length !== 0) ?
        <Page title={`Materia prima - ${material.code}`}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
            <Typography variant="h4" gutterBottom>
              Materia prima / Detalles / {material.code}
            </Typography>
          </Stack>
          <ListMaterialDetail
            material={material}
          />
        </Page>
        :
        <EmptyResponse title="Materia prima" />
      }
    </Fragment>
  )
}

export default DetailsMaterialScreen;
