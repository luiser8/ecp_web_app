import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';
import Page from '../../../components/layouts/Page';
import { Context } from '../../../auth/Context';
import SnackBarCustom from '../../../components/alerts/SnackBarCustom';
import { getUnitsSimpleService } from '../../../services/unitsService';
import { getSuppliersSimpleService } from '../../../services/supplierService';
import { useParams, useNavigate } from 'react-router-dom';
import FormPackings from '../forms/FormPackings';
import { getPackingKitByIdService, getPackingKitsExistsService, postPackingKitService, putPackingKitService } from '../../../services/packingkitService';
import { getCategoriesByDadService } from '../../../services/categoryService';

const PackingScreen = ({ mode }) => {
    const { checkUser, setOpenSessionExpired } = useContext(Context);
    const userToken = checkUser().accesstoken;
    const [units, setUnits] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [categories, setCategories] = useState([]);
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
            "category": "",
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
        packingsPayload.category = "";
        packingsPayload.supplier = "";
        packingsPayload.code = "";
        packingsPayload.name = "";
        packingsPayload.description = "";
        packingsPayload.entered_amount = 0;
        packingsPayload.purchase_price = 0;
    }

    const isValidPackingsPayload = () => {
        return packingsPayload.unit === ""
            || packingsPayload.category === ""
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
        const { data, error } = await getPackingKitsExistsService(type, value, userToken);
        if (error === "Invalid Token") {
            setOpenSessionExpired(true);
          }
        if (type === "code") {
            setIsCodeRepit(data !== undefined ? data : isCodeRepit);
        } if (type === "name") {
            setIsNameRepit(data !== undefined ? data : isNameRepit);
        }
    }

    const getUnits = async (userToken) => {
        const { data, error } = await getUnitsSimpleService(userToken);
        if (error === "Invalid Token") {
            setOpenSessionExpired(true);
        }
        setUnits(data);
    }

    const getCategories = async (userToken) => {
        const { data, error } = await getCategoriesByDadService("kits", userToken);
        if (error === "Invalid Token") {
            setOpenSessionExpired(true);
        }
        setCategories(data);
    }

    const getSuppliers = async (userToken) => {
        const { data, error } = await getSuppliersSimpleService(userToken);
        if (error === "Invalid Token") {
            setOpenSessionExpired(true);
        }
        setSuppliers(data);
    }

    const getPacking_kits = async (userToken) => {
        const { data, error } = await getPackingKitByIdService(id, userToken);
        if (error === "Invalid Token") {
            setOpenSessionExpired(true);
        }
        if (data !== undefined || null) {
            data.unit = data.unit._id;
            data.supplier = data.supplier._id;
            data.category = data.category._id;
            setPackingsPayload({ ...packingsPayload, ...data });
        }
    }

    const postPackingKits = async () => {
        const { data, error } = await postPackingKitService(packingsPayload, userToken);
        if (error === "Invalid Token") {
            setOpenSessionExpired(true);
        }
        if (data !== null) {
            setOpenSnackBar(true); resetPackingsPayload();
        }
        resetPackingsPayload();
    }

    const putPackingKits = async () => {
        const { data, error } = await putPackingKitService(id, packingsPayload, userToken);
        if (error === "Invalid Token") {
            setOpenSessionExpired(true);
        }
        if (data !== null) {
            setOpenSnackBar(true); resetPackingsPayload();
        }
        resetPackingsPayload();
        redirect();
    }

    useEffect(() => {
        if (mode === "edit") {
            getPacking_kits(userToken);
        } else {
            null;
        }
        getUnits(userToken);
        getSuppliers(userToken);
        getCategories(userToken);
        return () => {
            setUnits([]);
            setSuppliers([]);
            setCategories([]);
        };
    }, []);

    return (
        <Page title={getMode().title}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0} mt={-1}>
                <Typography variant="h4" gutterBottom>{getMode().msj}</Typography>
            </Stack>
            <Box sx={{ width: '100%' }}>
                <FormPackings
                    mode={mode}
                    units={units}
                    categories={categories}
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
