import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';
import Page from '../../../components/layouts/Page';
import { Context } from '../../../auth/Context';
import SnackBarCustom from '../../../components/alerts/SnackBarCustom';
import { getUnitsSimpleService } from '../../../services/unitsService';
import { getSuppliersSimpleService } from '../../../services/suppliersService';
import { useParams, useNavigate } from 'react-router-dom';
import FormPackings from '../forms/FormPackings';
import { getPackingKitByIdService, getPackingKitsExistsService, postPackingKitService, putPackingKitService } from '../../../services/packingkitService';

const PackingScreen = ({ mode }) => {
    const { checkUser } = useContext(Context);
    const userToken = checkUser().accesstoken;
    const [units, setUnits] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    //Router, params / navigate
    let { id } = useParams();
    const navigate = useNavigate();
    //Notificaciones
    const [openSnackBar, setOpenSnackBar] = useState(false);
    //Payload formulario
    const [isCodeRepit, setIsCodeRepit] = useState(false);
    const [isNameRepit, setIsNameRepit] = useState(false);
    const [packingsPayload, setPackingsPayload] = useState(
        {
            "unit": "",
            "supplier": "",
            "code": "",
            "name": "",
            "description": "",
            "entered_amount": 0,
            "purchase_price": 0,
            "status": "in stock"
        }
    );

    const getMode = () => {
        return {
            title: mode === "new" ? "Nueva herramienta de embalaje" : "Editar herramienta de embalaje",
            msj: mode === "new" ? "Herramientas de embalaje / Nuevo" : "Herramienta de embalaje / Editar",
            method: mode === "new" ? postPackingKits : putPackingKits
        }
    }

    const resetPackingsPayload = () => {
        packingsPayload.unit = "";
        packingsPayload.supplier = "";
        packingsPayload.code = "";
        packingsPayload.name = "";
        packingsPayload.description = "";
        packingsPayload.entered_amount = 0;
        packingsPayload.purchase_price = 0;
    }

    const isValidPackingsPayload = () => {
        return packingsPayload.unit === ""
            || packingsPayload.supplier === ""
            || packingsPayload.code === ""
            || packingsPayload.name === ""
            || packingsPayload.description === ""
            || packingsPayload.entered_amount === 0
            || packingsPayload.purchase_price === 0;
    }

    const showSnackBar = () => {
        return (
            <SnackBarCustom
                open={openSnackBar}
                setOpen={setOpenSnackBar}
                vertical="top"
                horizontal="right"
                severityOption={"success"}
                msj={"Herramienta de embalaje guardada!"}
            />
        )
    }

    const redirect = () => {
        const timer = setTimeout(() => {
            navigate("/packings");
        }, 2000);
        return () => clearTimeout(timer);
    }

    const checkCodeOrNameExists = async (type, value) => {
        if (value === "") {
            if (type === "code") {
                setIsCodeRepit(false);
            } else {
                setIsNameRepit(false);
            }
            return;
        }
        const packing_kits = await getPackingKitsExistsService(type, value, userToken);
        if (type === "code") {
            setIsCodeRepit(packing_kits !== undefined ? packing_kits : isCodeRepit);
        } if (type === "name") {
            setIsNameRepit(packing_kits !== undefined ? packing_kits : isNameRepit);
        }
    }

    const getUnits = async () => {
        setUnits(await getUnitsSimpleService(userToken));
    }

    const getSuppliers = async () => {
        setSuppliers(await getSuppliersSimpleService(userToken));
    }

    const getPacking_kits = async () => {
        const packingsItem = await getPackingKitByIdService(id, userToken);
        if (packingsItem !== undefined || null) {
            packingsItem.unit = packingsItem.unit._id;
            packingsItem.supplier = packingsItem.supplier._id;
            setPackingsPayload({ ...packingsPayload, ...packingsItem });
        }
    }

    const postPackingKits = async () => {
        const payload = await postPackingKitService(packingsPayload, userToken);
        if (payload !== null) {
            setOpenSnackBar(true); resetPackingsPayload();
        }
        resetPackingsPayload();
    }

    const putPackingKits = async () => {
        const payload = await putPackingKitService(id, packingsPayload, userToken);
        if (payload !== null) {
            setOpenSnackBar(true); resetPackingsPayload();
        }
        resetPackingsPayload();
        redirect();
    }

    useEffect(() => {
        if (mode === "edit") {
            getPacking_kits();
        } else {
            null;
        }
        getUnits();
        getSuppliers();
        return () => {
            setUnits([]);
            setSuppliers([]);
        };
    }, []);

    return (
        <Page title={getMode().title}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography variant="h4" gutterBottom>{getMode().msj}</Typography>
            </Stack>
            <Box sx={{ width: '100%' }}>
                <FormPackings
                    mode={mode}
                    units={units}
                    suppliers={suppliers}
                    packingsPayload={packingsPayload}
                    setPackingsPayload={setPackingsPayload}
                    checkCodeOrNameExists={checkCodeOrNameExists}
                    isCodeRepit={isCodeRepit}
                    isNameRepit={isNameRepit}
                    isValidPackingsPayload={isValidPackingsPayload}
                    submit={getMode().method}
                />
            </Box>
            {/* SnackBar */}
            {openSnackBar ? showSnackBar() : null}
        </Page>
    )
}

PackingScreen.propTypes = {
    mode: PropTypes.string,
};

export default PackingScreen;
