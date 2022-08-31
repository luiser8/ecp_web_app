import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import moment from 'moment';

const TableProductSimple = (
    {
        columns,
        rows,
    }
) => {
    return (
        <Fragment>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            {Object.keys(columns).map((column) => (
                                <TableCell
                                    key={columns[column].id}
                                    align="left"
                                    style={
                                        {
                                            fontWeight: "bold",
                                            backgroundColor: columns[column].color
                                        }
                                    }>
                                    {columns[column].name}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    {Object.keys(rows).length !== 0 ?
                    <TableBody>
                        {Object.keys(rows).map((row, key) => (
                            <TableRow key={key}>
                                <TableCell align="left" width={2}>{rows[row].code}</TableCell>
                                <TableCell align="left">
                                    <Link style={{textDecoration: "none"}} to={`/product/${rows[row]._id}`}>{rows[row].name}</Link>
                                </TableCell>
                                <TableCell align="left">{rows[row].presentation}</TableCell>
                                <TableCell align="left">{rows[row].status === "in process" ? "En proceso" : "Finalizado" }</TableCell>
                                <TableCell align="left">{moment(rows[row].createdAt).format("DD-MM-YYYY")}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    : <></>}
                </Table>
            </TableContainer>
        </Fragment>
    )
}

TableProductSimple.propTypes = {
    columns: PropTypes.array,
    materials: PropTypes.array,
};

export default TableProductSimple;