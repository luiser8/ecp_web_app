import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { DeleteOutlineOutlined, EditOutlined } from '@mui/icons-material';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import moment from 'moment';
import DialogCustomConfirm from '../../../components/dialogs/DialogCustomConfirm';
import TooltipCustom from '../../../components/tooltips/TooltipCustom';

const TableOtherExpenses = (
    {
        columns,
        rows,
        routing,
        rowsPerPage,
        setRowsPerPage,
        page,
        setPage,
        openDelete,
        setOpenDelete,
        showDeleteOtherExpenses,
        handleConfirm,
        otherExpensesValue,
    }
) => {
    return (
        <Fragment>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            {Object.keys(columns).map((column) => (
                                <TableCell key={columns[column].id} align={columns[column].align} style={{ fontWeight: "bold", backgroundColor: columns[column].color }}>
                                    {columns[column].name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(rows).map((row) => (
                            <TableRow key={rows[row]._id}>
                                <TableCell align="left">{rows[row].code}</TableCell>
                                <TableCell align="left">{rows[row].category.name}</TableCell>
                                <TableCell align="left">{rows[row].name}</TableCell>
                                <TableCell align="left">{rows[row].description}</TableCell>
                                <TableCell align="left">{rows[row].in_use ? "En uso" : "Sin uso"}</TableCell>
                                <TableCell align="left">
                                    {rows[row].status ? "Activo" : "Inactivo"}
                                </TableCell>
                                <TableCell align="left">{moment(rows[row].createdAt).format("DD-MM-YYYY")}</TableCell>
                                <TableCell align="right">
                                    <Grid item xs={20} md={20} lg={20}>
                                        <NavLink style={{ marginRight: 8 }} to={`${routing}edit/${rows[row]._id}`}>
                                            <TooltipCustom title="Editar otro gasto" placement="bottom">
                                                <EditOutlined style={{ fontSize: '36px' }} sx={{ color: '#000' }} />
                                            </TooltipCustom>
                                        </NavLink>
                                        <NavLink style={{ marginRight: 8 }} to={`#`}
                                            onClick={() => showDeleteOtherExpenses(
                                                {
                                                    open: true,
                                                    otherexpenses: { id: rows[row]._id, name: rows[row].name }
                                                }
                                            )}>
                                            <TooltipCustom title="Eliminar otro gasto" placement="bottom">
                                                <DeleteOutlineOutlined style={{ fontSize: '36px' }} sx={{ color: '#000' }} />
                                            </TooltipCustom>
                                        </NavLink>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                labelRowsPerPage="Filas por página"
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={() => setPage(page++)}
                onRowsPerPageChange={() => setRowsPerPage(rowsPerPage++)}
            /> */}
            {/* Modal confirmación eliminar */}
            <DialogCustomConfirm
                open={openDelete}
                setOpen={setOpenDelete}
                title={`Eliminar gasto ${otherExpensesValue.otherexpenses.name}`}
                content="Seguro que desea eliminar este gasto?"
                handleConfirm={handleConfirm}
            />
        </Fragment>
    )
}

TableOtherExpenses.propTypes = {
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    routing: PropTypes.string.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    setRowsPerPage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    openDelete: PropTypes.bool.isRequired,
    setOpenDelete: PropTypes.func.isRequired,
    showDeleteOtherExpenses: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    supplierValue: PropTypes.object,
};

export default TableOtherExpenses;