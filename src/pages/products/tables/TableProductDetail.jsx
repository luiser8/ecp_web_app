import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useIntl } from '../../../hooks/useIntl';

const TableProductDetail = (
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
                        {Object.keys(rows.materials).map((row, key) => (
                            <TableRow key={key}>
                                <TableCell align="left" width={2}>{rows.materials[row].material.code}</TableCell>
                                <TableCell align="left">{rows.materials[row].material.name}</TableCell>
                                <TableCell align="left" width={1}>{rows.materials[row].material.unit.code}</TableCell>
                                <TableCell align="left">{rows.materials[row].qty_x_mix}</TableCell>
                                <TableCell align="left">{useIntl('en-US', 'currency', 'USD', rows.materials[row].cost_x_mix)}</TableCell>
                                <TableCell align="left">{useIntl('en-US', 'currency', 'USD', rows.materials[row].cost_unit_x_mix)}</TableCell>
                                <TableCell align="left">{rows.materials[row].qty_x_box}</TableCell>
                                <TableCell align="left">{useIntl('en-US', 'currency', 'USD', rows.materials[row].cost_x_box)}</TableCell>
                                <TableCell align="left">{rows.materials[row].qty_x_unit}</TableCell>
                                <TableCell align="left">{useIntl('en-US', 'currency', 'USD', rows.materials[row].cost_x_unit)}</TableCell>
                            </TableRow>
                        ))}
                        {Object.keys(rows.total_x_materials).map((row, key) => (
                            <TableRow key={key} style={{fontWeight: "bold"}}>
                                <TableCell align="left" style={{fontWeight: "bold"}}>Totales</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>Materia prima</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}></TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{rows.total_x_materials[row].total_qty_x_mix}</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{useIntl('en-US', 'currency', 'USD', rows.total_x_materials[row].total_cost_x_mix)}</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{useIntl('en-US', 'currency', 'USD', rows.total_x_materials[row].total_cost_unit_x_mix)}</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{rows.total_x_materials[row].total_qty_x_box}</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{useIntl('en-US', 'currency', 'USD', rows.total_x_materials[row].total_cost_x_box)}</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{rows.total_x_materials[row].total_qty_x_unit}</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{useIntl('en-US', 'currency', 'USD', rows.total_x_materials[row].total_cost_x_unit)}</TableCell>
                            </TableRow>
                        ))}
                        {Object.keys(rows.packing_kits).map((row, key) => (
                            <TableRow key={key} style={{fontWeight: "bold"}}>
                                <TableCell align="left"width={2}>{rows.packing_kits[row].packing_kit.code}</TableCell>
                                <TableCell align="left">{rows.packing_kits[row].packing_kit.name}</TableCell>
                                <TableCell align="left" width={1}>{rows.packing_kits[row].packing_kit.unit.code}</TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left">{useIntl('en-US', 'currency', 'USD', rows.packing_kits[row].cost_unit_x_mix)}</TableCell>
                                <TableCell align="left">{rows.packing_kits[row].qty_x_box}</TableCell>
                                <TableCell align="left">{useIntl('en-US', 'currency', 'USD', rows.packing_kits[row].cost_x_box)}</TableCell>
                                <TableCell align="left">{rows.packing_kits[row].qty_x_unit}</TableCell>
                                <TableCell align="left">{useIntl('en-US', 'currency', 'USD', rows.packing_kits[row].cost_x_unit)}</TableCell>
                            </TableRow>
                        ))}
                        {Object.keys(rows.total_x_packing_kits).map((row, key) => (
                            <TableRow key={key} style={{fontWeight: "bold"}}>
                                <TableCell align="left" style={{fontWeight: "bold"}}>Totales</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>Herramientas de embalaje</TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{useIntl('en-US', 'currency', 'USD', rows.total_x_packing_kits[row].total_cost_unit_x_mix)}</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{rows.total_x_packing_kits[row].total_qty_x_box}</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{useIntl('en-US', 'currency', 'USD', rows.total_x_packing_kits[row].total_cost_x_box)}</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{rows.total_x_packing_kits[row].total_qty_x_unit}</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{useIntl('en-US', 'currency', 'USD', rows.total_x_packing_kits[row].total_cost_x_unit)}</TableCell>
                            </TableRow>
                        ))}
                        {Object.keys(rows.total_x_materials_packing_kits).map((row, key) => (
                            <TableRow key={key} style={{fontWeight: "bold"}}>
                                <TableCell align="left" style={{fontWeight: "bold"}}>Totales</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>Materia Prima + Herramientas</TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{useIntl('en-US', 'currency', 'USD', rows.total_x_materials_packing_kits[row].total_cost_unit_x_mix)}</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{rows.total_x_materials_packing_kits[row].total_qty_x_box}</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{useIntl('en-US', 'currency', 'USD', rows.total_x_materials_packing_kits[row].total_cost_x_box)}</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{rows.total_x_materials_packing_kits[row].total_qty_x_unit}</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{useIntl('en-US', 'currency', 'USD', rows.total_x_materials_packing_kits[row].total_cost_x_unit)}</TableCell>
                            </TableRow>
                        ))}

                        {Object.keys(rows.others_expenses).map((row, key) => (
                            <TableRow key={key} style={{fontWeight: "bold"}}>
                                <TableCell align="left"width={2}>{rows.others_expenses[row].other_expenses.code}</TableCell>
                                <TableCell align="left">{rows.others_expenses[row].other_expenses.name}</TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left">{useIntl('en-US', 'currency', 'USD', rows.others_expenses[row].total_cost_demanded)}</TableCell>
                                <TableCell align="left">{useIntl('en-US', 'currency', 'USD', rows.others_expenses[row].cost_x_box)}</TableCell>
                                <TableCell align="left">{useIntl('en-US', 'currency', 'USD', rows.others_expenses[row].cost_x_unit)}</TableCell>
                            </TableRow>
                        ))}
                        {Object.keys(rows.total_x_others_expenses).map((row, key) => (
                            <TableRow key={key} style={{fontWeight: "bold"}}>
                                <TableCell align="left" style={{fontWeight: "bold"}}>Totales</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>Otros gastos</TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>Costo total: </TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{useIntl('en-US', 'currency', 'USD', rows.total_x_others_expenses[row].total_cost_demanded)}</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{useIntl('en-US', 'currency', 'USD', rows.total_x_others_expenses[row].total_cost_x_box)}</TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{useIntl('en-US', 'currency', 'USD', rows.total_x_others_expenses[row].total_cost_x_unit)}</TableCell>
                            </TableRow>
                        ))}
                        {Object.keys(rows.total_x_materials_packing_kits_others_expenses).map((row, key) => (
                            <TableRow key={key} style={{fontWeight: "bold"}}>
                               <TableCell align="left" style={{fontWeight: "bold"}}>Totales</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>MP + Herramientas + Gastos</TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>Costo total: </TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{useIntl('en-US', 'currency', 'USD', rows.total_x_materials_packing_kits_others_expenses[row].total_cost_demanded)}</TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{useIntl('en-US', 'currency', 'USD', rows.total_x_materials_packing_kits_others_expenses[row].total_cost_x_box)}</TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left" style={{fontWeight: "bold"}}>{useIntl('en-US', 'currency', 'USD', rows.total_x_materials_packing_kits_others_expenses[row].total_cost_x_unit)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    : <></>}
                </Table>
            </TableContainer>
        </Fragment>
    )
}

TableProductDetail.propTypes = {
    columns: PropTypes.array,
    rows: PropTypes.array,
};

export default TableProductDetail;