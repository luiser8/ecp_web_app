import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../auth/Context';
import { Button, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import Page from '../../components/layouts/Page';
import TableMaterials from './tables/TableMaterials';
import EmptyResponse from '../../components/alerts/EmptyResponse';
import SnackBarCustom from '../../components/alerts/SnackBarCustom';
import { deleteMaterialService, getMaterialsSimpleService } from '../../services/materialsService';

const Materials = () => {
  const { checkUser } = useContext(Context);
  const userToken = checkUser().accesstoken;
  const [materials, setMaterials] = useState([]);
  //Paginación
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  //Eliminación
  const [materialValue, setMaterialValue] = useState({ open: false, material: { id: "", name: "" } });
  const [openDelete, setOpenDelete] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const columns = [
    { id: 1, name: 'Código', color: '#e3f2fd', align: 'left' },
    { id: 2, name: 'Categoría', color: '#e3f2fd', align: 'left' },
    { id: 3, name: 'Nombre', color: '#e3f2fd', align: 'left' },
    { id: 4, name: 'Unidad de medida', color: '#e3f2fd', align: 'left' },
    { id: 5, name: 'Cantidad actual', color: '#e3f2fd', align: 'left' },
    { id: 6, name: 'Estado', color: '#e3f2fd', align: 'left' },
    { id: 7, name: 'Fecha ingreso', color: '#e3f2fd', align: 'left' },
    { id: 8, name: 'Opciones', color: '#e3f2fd', align: 'right' },
  ];

  const showDeleteMaterial = (obj) => {
    if (obj.open) {
      setOpenDelete(obj.open);
      setMaterialValue({ ...materialValue, ...obj });
    }
  }

  const handleConfirm = async (open) => {
    if (open) {
      await confirmDeleteMaterial(materialValue.material.id);
    } else {
      setOpenDelete(open);
    }
  }

  const showSnackBar = () => {
    return (
      <SnackBarCustom
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        vertical="top"
        horizontal="right"
        severityOption={"success"}
        msj={"Material eliminado!"}
      />
    )
  }

  const confirmDeleteMaterial = async (id) => {
    const material = await deleteMaterialService(id, userToken);
    if (material !== null) {
      setOpenDelete(false); setOpenSnackBar(true); getMaterials();
    }
  }

  const getMaterials = async () => {
    setMaterials(await getMaterialsSimpleService(userToken));
  }

  useEffect(() => {
    getMaterials();
    return () => {
      setMaterials([]);
    };
  }, []);

  return (
    <Page title="Materia prima">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} mt={-1}>
        <Typography variant="h4" gutterBottom>Materia prima</Typography>
        <Button sx={{ bgcolor: 'primary.header' }} variant="contained" component={NavLink} to="/materials/new" startIcon={<Add icon="eva:plus-fill" />}>
          Nueva materia prima
        </Button>
      </Stack>
      {(Object.keys(materials).length !== 0) ?
        <TableMaterials
          columns={columns}
          rows={materials}
          routing="/materials/"
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          showDeleteMaterial={showDeleteMaterial}
          handleConfirm={handleConfirm}
          materialValue={materialValue}
        />
        :
        <EmptyResponse title="Materia prima" />
      }
      {/* SnackBar */}
      {openSnackBar ? showSnackBar() : null}
    </Page>
  )
}

export default Materials;