import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../auth/Context';
import { Button, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import Page from '../../components/layouts/Page';
import EmptyResponse from '../../components/alerts/EmptyResponse';
import SnackBarCustom from '../../components/alerts/SnackBarCustom';
import { deleteCategoriesService, getCategoryAllService } from '../../services/categoryService';
import TableCategory from './tables/TableCategory';

const Category = () => {
  const { checkUser, setOpenSessionExpired } = useContext(Context);
  const userToken = checkUser().accesstoken;
  const [categories, setCategories] = useState([]);
  //Paginación
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  //Eliminación
  const [categoriesValue, setCategoriesValue] = useState({ open: false, category: { id: "", name: "" } });
  const [openDelete, setOpenDelete] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const columns = [
    { id: 1, name: 'Nombre', color: '#e3f2fd', align: 'left' },
    { id: 2, name: 'Descripción', color: '#e3f2fd', align: 'left' },
    { id: 3, name: 'Categoría principal', color: '#e3f2fd', align: 'left' },
    { id: 4, name: 'Estado', color: '#e3f2fd', align: 'left' },
    { id: 5, name: 'Fecha', color: '#e3f2fd', align: 'left' },
    { id: 6, name: 'Opciones', color: '#e3f2fd', align: 'right' },
  ];

  const showDeleteCategory = (obj) => {
    if (obj.open) {
      setOpenDelete(obj.open);
      setCategoriesValue({ ...categoriesValue, ...obj });
    }
  }

  const handleConfirm = async (open) => {
    if (open) {
      await confirmDeleteCategory(categoriesValue.category.id);
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
        msj={"Categoría eliminada!"}
      />
    )
  }

  const confirmDeleteCategory = async (id) => {
    const { data, error } = await deleteCategoriesService(id, userToken);
    if (error === "Invalid Token") {
      setOpenSessionExpired(true);
    }
    if (data !== null) {
      setOpenDelete(false); setOpenSnackBar(true); getCategories(userToken);
    }
  }

  const getCategories = async (userToken) => {
    const { data, error } = await getCategoryAllService(userToken);
    if (error === "Invalid Token") {
      setOpenSessionExpired(true);
    }
    setCategories(data);
  }

  useEffect(() => {
    getCategories(userToken);
    return () => {
      setCategories([]);
    };
  }, []);

  return (
    <Page title="Categorías">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} mt={-1}>
        <Typography variant="h4" gutterBottom>Categorías</Typography>
        <Button sx={{ bgcolor: 'primary.header' }} variant="contained" component={NavLink} to="/categories/new" startIcon={<Add icon="eva:plus-fill" />}>
          Nueva categoría
        </Button>
      </Stack>
      {(Object.keys(categories).length !== 0) ?
        <TableCategory
          columns={columns}
          rows={categories}
          routing="/categories/"
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          showDeleteCategory={showDeleteCategory}
          handleConfirm={handleConfirm}
          categoriesValue={categoriesValue}
        />
        :
        <EmptyResponse title="Categorías" />
      }
      {/* SnackBar */}
      {openSnackBar ? showSnackBar() : null}
    </Page>
  )
}

export default Category;