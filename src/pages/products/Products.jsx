import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../auth/Context';
import { Button, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import Page from '../../components/layouts/Page';
import TableProducts from './tables/TableProducts';
import EmptyResponse from '../../components/alerts/EmptyResponse';
import SnackBarCustom from '../../components/alerts/SnackBarCustom';
import { deleteProductService, getProductsSimpleService } from '../../services/productsService';

const Products = () => {
  const { checkUser } = useContext(Context);
  const userToken = checkUser().accesstoken;
  const [products, setProducts] = useState([]);
  //Paginación
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  //Eliminación
  const [productValue, setProductValue] = useState({ open: false, product: { id: "", name: "" } });
  const [openDelete, setOpenDelete] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const columns = [
    { id: 1, name: 'Código', color: '#e3f2fd', align: 'left' },
    { id: 2, name: 'Nombre', color: '#e3f2fd', align: 'left' },
    { id: 3, name: 'Presentación', color: '#e3f2fd', align: 'left' },
    { id: 4, name: 'Estado', color: '#e3f2fd', align: 'left' },
    { id: 5, name: 'Fecha', color: '#e3f2fd', align: 'left' },
    { id: 6, name: 'Opciones', color: '#e3f2fd', align: 'right' },
  ];

  const showDeleteProduct = (obj) => {
    if (obj.open) {
      setOpenDelete(obj.open);
      setProductValue({ ...productValue, ...obj });
    }
  }

  const handleConfirm = async (open) => {
    if (open) {
      await confirmDeleteProduct(productValue.product.id);
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
        msj={"Producto eliminado!"}
      />
    )
  }

  const confirmDeleteProduct = async (id) => {
    const product = await deleteProductService(id, userToken);
    if (product !== null) {
      getProducts(); setOpenDelete(false); setOpenSnackBar(true);
    }
  }

  const getProducts = async () => {
    setProducts(await getProductsSimpleService(userToken));
  }

  useEffect(() => {
    getProducts();
    return () => {
      setProducts([]);
    };
  }, []);

  return (
    <Page title="Productos">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4" gutterBottom>Productos</Typography>
        <Button sx={{ bgcolor: 'primary.header' }} variant="contained" component={NavLink} to="/product/new" startIcon={<Add icon="eva:plus-fill" />}>
          Nuevo producto
        </Button>
      </Stack>
      {(Object.keys(products).length !== 0) ?
        <TableProducts
          columns={columns}
          rows={products}
          routing="/product/"
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          showDeleteProduct={showDeleteProduct}
          handleConfirm={handleConfirm}
          productValue={productValue}
        />
        :
        <EmptyResponse title="Productos" />
      }
      {/* SnackBar */}
      {openSnackBar ? showSnackBar() : null}
    </Page>
  )
}

export default Products;