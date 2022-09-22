import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../auth/Context';
import { Button, Stack, Typography } from '@mui/material';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import Page from '../../components/layouts/Page';
import EmptyResponse from '../../components/alerts/EmptyResponse';
import { getAllRequerimentsService } from '../../services/requerimentsService';
import TableRequeriments from './tables/TableRequeriments';

const Requirements = () => {
    const { checkUser } = useContext(Context);
    const userToken = checkUser().accesstoken;
    const [requirements, setRequirements] = useState([]);
      //Paginación
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    const columns = [
        { id: 1, name: 'Código', color: '#e3f2fd', align: 'left' },
        { id: 2, name: 'Linea', color: '#e3f2fd', align: 'left' },
        { id: 3, name: 'Producto', color: '#e3f2fd', align: 'left' },
        { id: 4, name: 'UM', color: '#e3f2fd', align: 'left' },
        { id: 5, name: 'Cajas Estándar por Mezclas', color: '#e3f2fd', align: 'left' },
        { id: 6, name: 'Unidades Estándar por Mezclas', color: '#e3f2fd', align: 'left' },
        { id: 7, name: 'Cant. Mezclas Producidas', color: '#e3f2fd', align: 'right' },
        { id: 8, name: 'Costo de Fabricación x Mezcla ($)', color: '#e3f2fd', align: 'left' },
        { id: 9, name: 'Costo x Mezclas Producidas', color: '#e3f2fd', align: 'left' },
        { id: 10, name: 'Cant. de Fabricación x Caja', color: '#e3f2fd', align: 'right' },
        { id: 11, name: 'Costo de Fabricación x Caja ($)', color: '#e3f2fd', align: 'left' },
        { id: 12, name: 'Cant. de Fabricación x Unidad', color: '#e3f2fd', align: 'right' },
        { id: 13, name: 'Costo de Fabricación x Unidad ($)', color: '#e3f2fd', align: 'right' },
    ];

    const getRequeriments = async () => {
        setRequirements(await getAllRequerimentsService(userToken));
    }

    useEffect(() => {
        getRequeriments();
        return () => {
            setRequirements([]);
        };
    }, []);

    return (
        <Page title="Resumen de requerimientos">
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} mt={-1}>
                <Typography variant="h4" gutterBottom>Resumen de requerimientos</Typography>
                <Button sx={{ bgcolor: 'primary.header' }} variant="contained" startIcon={<PrintOutlinedIcon />}>
                    Descargar archivo
                </Button>
            </Stack>
            {(Object.keys(requirements).length !== 0) ?
                <TableRequeriments
                    columns={columns}
                    rows={requirements}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    page={page}
                    setPage={setPage}
                />
                :
                <EmptyResponse
                    title="Resumen de requerimientos"
                    subtitle={false}
                />
            }
        </Page>
    )
}

export default Requirements;
