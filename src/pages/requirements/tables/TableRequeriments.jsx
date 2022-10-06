import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useIntl } from '../../../hooks/useIntl';

const TableRequeriments = (
    {
        columns,
        rows,
        rowsPerPage,
        setRowsPerPage,
        page,
        setPage,
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
                            <TableRow key={rows[row].code}>
                                <TableCell align="left">{rows[row].code}</TableCell>
                                <TableCell align="left">{rows[row].category.name}</TableCell>
                                <TableCell align="left">{rows[row].name}</TableCell>
                                <TableCell align="left">{rows[row].unit}</TableCell>
                                <TableCell align="left">{rows[row].boxes_x_mix}</TableCell>
                                <TableCell align="left">{rows[row].units_x_mix}</TableCell>
                                <TableCell align="left">{rows[row].qty_x_mix}</TableCell>
                                <TableCell align="left">{useIntl('en-US', 'currency', 'USD', rows[row].kgs_qty_x_box)}</TableCell>
                                <TableCell align="left">{useIntl('en-US', 'currency', 'USD', rows[row].cost_fab_x_mix)}</TableCell>
                                <TableCell align="left">{rows[row].qty_fab_x_box}</TableCell>
                                <TableCell align="left">{useIntl('en-US', 'currency', 'USD', rows[row].cost_fab_x_box)}</TableCell>
                                <TableCell align="left">{rows[row].qty_fab_x_unit}</TableCell>
                                <TableCell align="left">{useIntl('en-US', 'currency', 'USD', rows[row].cost_fab_x_unit)}</TableCell>
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
        </Fragment>
    )
}

TableRequeriments.propTypes = {
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    setRowsPerPage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
};

export default TableRequeriments;