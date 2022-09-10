import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../auth/Context';
import { Button, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import Page from '../../components/layouts/Page';
import EmptyResponse from '../../components/alerts/EmptyResponse';
import SnackBarCustom from '../../components/alerts/SnackBarCustom';
import { deleteOtherExpensesService, getOtherExpensesAllService } from '../../services/otherExpensesService';
import TableOtherExpenses from './tables/TableOtherExpenses';

const OtherExpenses = () => {
  const { checkUser } = useContext(Context);
  const userToken = checkUser().accesstoken;
  const [otherExpenses, setOtherExpenses] = useState([]);
  //Paginación
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  //Eliminación
  const [otherExpensesValue, setOtherExpensesValue] = useState({ open: false, otherexpenses: { id: "", name: "" } });
  const [openDelete, setOpenDelete] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const columns = [
    { id: 1, name: 'Código', color: '#e3f2fd', align: 'left' },
    { id: 2, name: 'Nombre', color: '#e3f2fd', align: 'left' },
    { id: 3, name: 'Descripción', color: '#e3f2fd', align: 'left' },
    { id: 4, name: 'En uso', color: '#e3f2fd', align: 'left' },
    { id: 5, name: 'Estado', color: '#e3f2fd', align: 'left' },
    { id: 6, name: 'Fecha', color: '#e3f2fd', align: 'left' },
    { id: 7, name: 'Opciones', color: '#e3f2fd', align: 'right' },
  ];

  const showDeleteOtherExpenses = (obj) => {
    if (obj.open) {
      setOpenDelete(obj.open);
      setOtherExpensesValue({ ...otherExpensesValue, ...obj });
    }
  }

  const handleConfirm = async (open) => {
    if (open) {
      await confirmDeleteOtherExpenses(otherExpensesValue.otherexpenses.id);
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
        msj={"Gasto eliminado!"}
      />
    )
  }

  const confirmDeleteOtherExpenses = async (id) => {
    const otherExpenses = await deleteOtherExpensesService(id, userToken);
    if (otherExpenses !== null) {
      setOpenDelete(false); setOpenSnackBar(true); getOtherExpenses();
    }
  }

  const getOtherExpenses = async () => {
    setOtherExpenses(await getOtherExpensesAllService(userToken));
  }

  useEffect(() => {
    getOtherExpenses();
    return () => {
      setOtherExpenses([]);
    };
  }, []);

  return (
    <Page title="Otros gastos">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} mt={-1}>
        <Typography variant="h4" gutterBottom>Otros gastos</Typography>
        <Button sx={{ bgcolor: 'primary.header' }} variant="contained" component={NavLink} to="/otherexpenses/new" startIcon={<Add icon="eva:plus-fill" />}>
          Nuevo gasto
        </Button>
      </Stack>
      {(Object.keys(otherExpenses).length !== 0) ?
        <TableOtherExpenses
          columns={columns}
          rows={otherExpenses}
          routing="/otherexpenses/"
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          showDeleteOtherExpenses={showDeleteOtherExpenses}
          handleConfirm={handleConfirm}
          otherExpensesValue={otherExpensesValue}
        />
        :
        <EmptyResponse title="Otros gastos" />
      }
      {/* SnackBar */}
      {openSnackBar ? showSnackBar() : null}
    </Page>
  )
}

export default OtherExpenses;