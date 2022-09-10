import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../auth/Context';
import { Button, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import Page from '../../components/layouts/Page';
import EmptyResponse from '../../components/alerts/EmptyResponse';
import SnackBarCustom from '../../components/alerts/SnackBarCustom';
import { deleteSupplierService, getSuppliersAllService } from '../../services/supplierService';
import TableSuppliers from './tables/TableSuppliers';

const Suppliers = () => {
  const { checkUser } = useContext(Context);
  const userToken = checkUser().accesstoken;
  const [suppliers, setSuppliers] = useState([]);
  //Paginación
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  //Eliminación
  const [supplierValue, setSupplierValue] = useState({ open: false, supplier: { id: "", name: "" } });
  const [openDelete, setOpenDelete] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const columns = [
    { id: 1, name: 'Identificador', color: '#e3f2fd', align: 'left' },
    { id: 2, name: 'Nombre', color: '#e3f2fd', align: 'left' },
    { id: 3, name: 'Email', color: '#e3f2fd', align: 'left' },
    { id: 4, name: 'Teléfono', color: '#e3f2fd', align: 'left' },
    { id: 5, name: 'Estado', color: '#e3f2fd', align: 'left' },
    { id: 6, name: 'Fecha', color: '#e3f2fd', align: 'left' },
    { id: 7, name: 'Opciones', color: '#e3f2fd', align: 'right' },
  ];

  const showDeleteSupplier = (obj) => {
    if (obj.open) {
      setOpenDelete(obj.open);
      setSupplierValue({ ...supplierValue, ...obj });
    }
  }

  const handleConfirm = async (open) => {
    if (open) {
      await confirmDeleteSupplier(supplierValue.supplier.id);
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
        msj={"Proveedor eliminado!"}
      />
    )
  }

  const confirmDeleteSupplier = async (id) => {
    const supplier = await deleteSupplierService(id, userToken);
    if (supplier !== null) {
      setOpenDelete(false); setOpenSnackBar(true); getSuppliers();
    }
  }

  const getSuppliers = async () => {
    setSuppliers(await getSuppliersAllService(userToken));
  }

  useEffect(() => {
    getSuppliers();
    return () => {
      setSuppliers([]);
    };
  }, []);

  return (
    <Page title="Proveedores">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} mt={-1}>
        <Typography variant="h4" gutterBottom>Proveedores</Typography>
        <Button sx={{ bgcolor: 'primary.header' }} variant="contained" component={NavLink} to="/suppliers/new" startIcon={<Add icon="eva:plus-fill" />}>
          Nuevo proveedor
        </Button>
      </Stack>
      {(Object.keys(suppliers).length !== 0) ?
        <TableSuppliers
          columns={columns}
          rows={suppliers}
          routing="/suppliers/"
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          showDeleteSupplier={showDeleteSupplier}
          handleConfirm={handleConfirm}
          supplierValue={supplierValue}
        />
        :
        <EmptyResponse title="Proveedores" />
      }
      {/* SnackBar */}
      {openSnackBar ? showSnackBar() : null}
    </Page>
  )
}

export default Suppliers;