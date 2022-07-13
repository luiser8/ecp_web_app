import React, { useState, useEffect, useContext, Fragment } from 'react';
import moment from 'moment';
import { Context } from '../../auth/Context';
import { getProductsSimple } from '../../services/productsService';
import { Button, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { Add, DeleteOutlineOutlined, EditOutlined } from '@mui/icons-material';
import LoupeOutlinedIcon from '@mui/icons-material/LoupeOutlined';
import { NavLink } from 'react-router-dom';
import Page from '../../components/layouts/Page';
import SpinnerCustom from '../../components/alerts/SpinnerCustom';

const Products = () => {
  const { checkUser } = useContext(Context);
  const userToken = checkUser().accesstoken;
  const [products, setProducts] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const getProducts = async () => {
    (Promise.all([
      getProductsSimple(userToken).then((values) => {
        if (values !== null) {
          setProducts(values !== undefined ? values : []);
        }
      }),
    ]).catch(error => {
      new Error(error);
    }));
  }

  useEffect(() => {
    getProducts();
    return () => {
      setProducts([]);
    };
  }, []);

  return (
    <Page title="Productos">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Productos
        </Typography>
        <Button variant="contained" component={NavLink} to="#" startIcon={<Add icon="eva:plus-fill" />}>
          Nuevo producto
        </Button>
      </Stack>
      {(Object.keys(products).length !== 0) ?
        <Fragment>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>Código</TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>Nombre</TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>Presentación</TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>Estado</TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>Fecha</TableCell>
                  <TableCell align="left" style={{ fontWeight: "bold" }}>Opciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(products).map((product) => (
                  <TableRow key={products[product]._id}>
                    <TableCell align="left">{products[product].code}</TableCell>
                    <TableCell align="left">{products[product].name}</TableCell>
                    <TableCell align="left">{products[product].presentation}</TableCell>
                    <TableCell align="left">{products[product].status}</TableCell>
                    <TableCell align="left">{moment(products[product].createdAt).format("DD-MM-YYYY")}</TableCell>
                    <TableCell align="left">
                      <Grid item xs={20} md={20} lg={20}>
                        <NavLink to={`/product/${products[product]._id}`}>
                          <LoupeOutlinedIcon style={{ fontSize: '36px' }} sx={{ color: '#000' }} />
                        </NavLink>
                        <EditOutlined style={{ fontSize: '36px' }} />
                        <DeleteOutlineOutlined style={{ fontSize: '36px' }} />
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            labelRowsPerPage="Filas por página"
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={() => console.log('ok')}
            onRowsPerPageChange={() => console.log('ok')}
          />
        </Fragment>
        :
        <SpinnerCustom />
      }
    </Page>
  )
}

export default Products;