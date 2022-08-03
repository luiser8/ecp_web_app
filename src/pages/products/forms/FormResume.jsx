import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { TreeItem, TreeView } from '@mui/lab';
import { ChevronRight, ExpandMore } from '@mui/icons-material';

const FormResume = ({ productPayload, productMaterialResume, productPackingkitsResume }) => {
    const [expanded, setExpanded] = useState([]);
    const [selected, setSelected] = useState([]);

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
      };
    
      const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
      };
    
      const handleExpandClick = () => {
        setExpanded((oldExpanded) =>
          oldExpanded.length === 0 ? ['1', '5', '6', '7'] : [],
        );
      };

    return (
        <Grid component="div" container>
            <Box component="div" sx={{ height: '100%', flexGrow: 1, maxWidth: '100%', overflowY: 'auto', width: '90%', pl: 2 }}>
                <Box sx={{ mb: 1 }}>
                    <Button onClick={handleExpandClick}>
                        {expanded.length === 0 ? 'Expandir todo' : 'Desplegar todo'}
                    </Button>
                </Box>
                <TreeView
                    aria-label="controlled"
                    defaultCollapseIcon={<ExpandMore />}
                    defaultExpandIcon={<ChevronRight />}
                    expanded={expanded}
                    selected={selected}
                    onNodeToggle={handleToggle}
                    onNodeSelect={handleSelect}
                    multiSelect
                >
                    <TreeItem nodeId="1" label="Producto">
                        <TreeItem nodeId="2" label={`Código: ${productPayload.code}`} />
                        <TreeItem nodeId="3" label={`Nombre: ${productPayload.name}`} />
                        <TreeItem nodeId="4" label={`Descripción: ${productPayload.description}`} />
                        <TreeItem nodeId="5" label={`Presentación: ${productPayload.presentation}`} />
                        <TreeItem nodeId="6" label={`Cajas por mezcla: ${productPayload.boxes_x_mix}`} />
                        <TreeItem nodeId="7" label={`Unidades por mezcla: ${productPayload.units_x_mix}`} />
                        <TreeItem nodeId="8" label={`Margen de ganancia: ${productPayload.margin_of_gain}`} />
                        <TreeItem nodeId="9" label={`PVP por cajas: ${productPayload.pvp_x_boxes}`} />
                        <TreeItem nodeId="10" label={`PVP por unidades: ${productPayload.pvp_x_units}`} />
                    </TreeItem>
                    <TreeItem nodeId="11" label="Materia prima">
                        {productMaterialResume.map((item, key) => (
                            <Fragment key={key}>
                                <TreeItem nodeId="12" label={`Item: ${item.code}`} />
                                <TreeItem nodeId="13" label={`Material: ${item.name}`} />
                                <TreeItem nodeId="14" label={`Cantidad por mezcla: ${item.qty_x_mix}`} />
                                <TreeItem nodeId="15" label={`Costo por mezcla: ${item.cost_x_mix}`} />
                            </Fragment>
                        ))}
                    </TreeItem>
                    <TreeItem nodeId="16" label="Kit de embalaje">
                        {productPackingkitsResume.map((item, key) => (
                            <Fragment key={key}>
                                <TreeItem nodeId="17" label={`Item: ${item.code}`} />
                                <TreeItem nodeId="18" label={`Material: ${item.name}`} />
                                <TreeItem nodeId="19" label={`Costo unidad por mezcla: ${item.cost_unit_x_mix}`} />
                                <TreeItem nodeId="20" label={`Cantidad por caja: ${item.qty_x_box}`} />
                            </Fragment>
                        ))}
                    </TreeItem>
                </TreeView>
            </Box>
        </Grid>
    )
}

FormResume.propTypes = {
    productPayload: PropTypes.object,
    productMaterialResume: PropTypes.array,
    productPackingkitsResume: PropTypes.array,
};

export default FormResume;
