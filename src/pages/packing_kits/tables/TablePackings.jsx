import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { DeleteOutlineOutlined, EditOutlined, DoNotDisturbOffOutlined } from '@mui/icons-material';
import FilterCenterFocusOutlinedIcon from '@mui/icons-material/FilterCenterFocusOutlined';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import moment from 'moment';
import DialogCustomConfirm from '../../../components/dialogs/DialogCustomConfirm';
import TooltipCustom from '../../../components/tooltips/TooltipCustom';

const TablePackings = (
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
        showDeletePackingkits,
        handleConfirm,
        packingValue,
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
                                <TableCell align="left">{rows[row].unit.code}</TableCell>
                                <TableCell align="left">{rows[row].name}</TableCell>
                                <TableCell align="left">{rows[row].current_amount}</TableCell>
                                <TableCell align="left">
                                    {rows[row].status === "in stock" ? "En stock" : "En orden" }
                                </TableCell>
                                <TableCell align="left">{moment(rows[row].createdAt).format("DD-MM-YYYY")}</TableCell>
                                <TableCell align="right">
                                    <Grid item xs={20} md={20} lg={20}>
                                        <NavLink style={{ marginRight: 10 }} to={`${routing}${rows[row]._id}`}>
                                            <FilterCenterFocusOutlinedIcon style={{ fontSize: '36px' }} sx={{ color: '#000' }} />
                                        </NavLink>
                                        <NavLink style={{ marginRight: 8 }} to={`${routing}edit/${rows[row]._id}`}>
                                            <EditOutlined style={{ fontSize: '36px' }} sx={{ color: '#000' }} />
                                        </NavLink>
                                        {rows[row].in_use ?
                                            <NavLink style={{ marginRight: 8 }} to={`#`}>
                                                <TooltipCustom
                                                    title="No puedes eliminar una herramienta de embalaje en uso"
                                                    placement="bottom"
                                                >
                                                    <DoNotDisturbOffOutlined style={{ fontSize: '36px' }} sx={{ color: '#000' }} />
                                                </TooltipCustom>
                                            </NavLink>
                                            :
                                            <NavLink style={{ marginRight: 8 }} to={`#`}
                                                onClick={() => showDeletePackingkits(
                                                    {
                                                        open: true,
                                                        packing_kit: { id: rows[row]._id, name: rows[row].name }
                                                    }
                                                )}>
                                                <DeleteOutlineOutlined style={{ fontSize: '36px' }} sx={{ color: '#000' }} />
                                            </NavLink>
                                        }
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
                title={`Eliminar herramienta de embalaje ${packingValue.packing_kit.name}`}
                content="Seguro que desea eliminar esta herramienta de embalaje?"
                handleConfirm={handleConfirm}
            />
        </Fragment>
    )
}

TablePackings.propTypes = {
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    routing: PropTypes.string.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    setRowsPerPage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    openDelete: PropTypes.bool.isRequired,
    setOpenDelete: PropTypes.func.isRequired,
    showDeletePackingkits: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    packingValue: PropTypes.object,
};

export default TablePackings