import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../auth/Context';
import { Button, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import Page from '../../components/layouts/Page';
import EmptyResponse from '../../components/alerts/EmptyResponse';
import SnackBarCustom from '../../components/alerts/SnackBarCustom';
import { deletePackingKitService, getPackingKitSimpleService } from '../../services/packingkitService';
import TablePackings from './tables/TablePackings';

const Packings = () => {
  const { checkUser, setOpenSessionExpired } = useContext(Context);
  const userToken = checkUser().accesstoken;
  const [packing_kits, setPacking_kits] = useState([]);
  //Paginación
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  //Eliminación
  const [packingValue, setPackingValue] = useState({ open: false, packing_kit: { id: "", name: "" } });
  const [openDelete, setOpenDelete] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const columns = [
    { id: 1, name: 'Código', color: '#e3f2fd', align: 'left' },
    { id: 2, name: 'Categoría', color: '#e3f2fd', align: 'left' },
    { id: 3, name: 'Unidad de medida', color: '#e3f2fd', align: 'left' },
    { id: 4, name: 'Nombre', color: '#e3f2fd', align: 'left' },
    { id: 5, name: 'Cantidad actual', color: '#e3f2fd', align: 'left' },
    { id: 6, name: 'Estado', color: '#e3f2fd', align: 'left' },
    { id: 7, name: 'Fecha ingreso', color: '#e3f2fd', align: 'left' },
    { id: 8, name: 'Opciones', color: '#e3f2fd', align: 'right' },
  ];

  const showDeletePackingkits = (obj) => {
    if (obj.open) {
      setOpenDelete(obj.open);
      setPackingValue({ ...packingValue, ...obj });
    }
  }

  const handleConfirm = async (open) => {
    if (open) {
      await confirmDeletePackings(packingValue.packing_kit.id);
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
        msj={"Herramienta de embalaje eliminado!"}
      />
    )
  }

  const confirmDeletePackings = async (id) => {
    const { data, error } = await deletePackingKitService(id, userToken);
    if (error === "Invalid Token") {
      setOpenSessionExpired(true);
    }
    if (data !== null) {
      setOpenDelete(false); setOpenSnackBar(true); getPackings(userToken);
    }
  }

  const getPackings = async (userToken) => {
    const { data, error } = await getPackingKitSimpleService(userToken);
    if (error === "Invalid Token") {
      setOpenSessionExpired(true);
    }
    setPacking_kits(data);
  }

  useEffect(() => {
    getPackings(userToken);
    return () => {
      setPacking_kits([]);
    };
  }, []);

  return (
    <Page title="Herramienta de embalaje">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} mt={-1}>
        <Typography variant="h4" gutterBottom>Herramienta de embalaje</Typography>
        <Button sx={{ bgcolor: 'primary.header' }} variant="contained" component={NavLink} to="/packings/new" startIcon={<Add icon="eva:plus-fill" />}>
          Nueva herramienta de embalaje
        </Button>
      </Stack>
      {(Object.keys(packing_kits).length !== 0) ?
        <TablePackings
          columns={columns}
          rows={packing_kits}
          routing="/packings/"
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          showDeletePackingkits={showDeletePackingkits}
          handleConfirm={handleConfirm}
          packingValue={packingValue}
        />
        :
        <EmptyResponse title="Herramienta de embalaje" />
      }
      {/* SnackBar */}
      {openSnackBar ? showSnackBar() : null}
    </Page>
  )
}

export default Packings;