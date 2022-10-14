import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';
import Page from '../../../components/layouts/Page';
import { Context } from '../../../auth/Context';
import SnackBarCustom from '../../../components/alerts/SnackBarCustom';
import FormMaterial from '../forms/FormMaterial';
import { getMaterialByIdService, getMaterialsExistsService, postMaterialService, putMaterialService } from '../../../services/materialsService';
import { getUnitsSimpleService } from '../../../services/unitsService';
import { getSuppliersSimpleService } from '../../../services/supplierService';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoriesByDadService } from '../../../services/categoryService';

const MaterialScreen = ({ mode }) => {
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
    const [materialPayload, setMaterialPayload] = useState(
        {
            "unit": "",
            "category": "",
            "supplier": "",
            "code": "",
            "name": "",
            "description": "",
            "entered_amount": 0,
            "purchase_price": 0,
            "expiration_date": new Date(),
            "status": "in stock"
        }
    );

    const getMode = () => {
        return {
            title: mode === "new" ? "Nueva materia prima" : "Editar materia prima",
            msj: mode === "new" ? "Materia prima / Nuevo" : "Materia prima / Editar",
            method: mode === "new" ? postMaterial : putMaterial
        }
    }

    const resetMaterialPayload = () => {
        materialPayload.unit = "";
        materialPayload.category = "";
        materialPayload.supplier = "";
        materialPayload.code = "";
        materialPayload.name = "";
        materialPayload.description = "";
        materialPayload.entered_amount = 0;
        materialPayload.purchase_price = 0;
        materialPayload.expiration_date = new Date();
    }

    const isValidMaterialPayload = () => {
        return materialPayload.unit === ""
            || materialPayload.category === ""
            || materialPayload.supplier === ""
            || materialPayload.code === ""
            || materialPayload.name === ""
            || materialPayload.description === ""
            || materialPayload.entered_amount === 0
            || materialPayload.purchase_price === 0
            || materialPayload.expiration_date === null;
    }

    const showSnackBar = () => {
        return (
            <SnackBarCustom
                open={openSnackBar}
                setOpen={setOpenSnackBar}
                vertical="top"
                horizontal="right"
                severityOption={"success"}
                msj={"Materia prima guardada!"}
            />
        )
    }

    const redirect = () => {
        const timer = setTimeout(() => {
            navigate("/materials");
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
        const { data, error } = await getMaterialsExistsService(type, value, userToken);
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
        const { data, error } = await getCategoriesByDadService("material", userToken);
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

    const getMaterial = async (userToken) => {
        const { data, error } = await getMaterialByIdService(id, userToken);
        if (error === "Invalid Token") {
            setOpenSessionExpired(true);
        }
        if (data !== undefined || null) {
            data.unit = data.unit._id;
            data.category = data.category._id;
            data.supplier = data.supplier._id;
            setMaterialPayload({ ...materialPayload, ...data });
        }
    }

    const postMaterial = async () => {
        const { data, error } = await postMaterialService(materialPayload, userToken);
        if (error === "Invalid Token") {
            setOpenSessionExpired(true);
        }
        if (data !== null) {
            setOpenSnackBar(true); resetMaterialPayload();
        }
        resetMaterialPayload();
    }

    const putMaterial = async () => {
        const { data, error } = await putMaterialService(id, materialPayload, userToken);
        if (error === "Invalid Token") {
            setOpenSessionExpired(true);
        }
        if (data !== null) {
            setOpenSnackBar(true); resetMaterialPayload();
        }
        resetMaterialPayload();
        redirect();
    }

    useEffect(() => {
        if (mode === "edit") {
            getMaterial(userToken);
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
                <FormMaterial
                    mode={mode}
                    units={units}
                    categories={categories}
                    suppliers={suppliers}
                    materialPayload={materialPayload}
                    setMaterialPayload={setMaterialPayload}
                    checkCodeOrNameExists={checkCodeOrNameExists}
                    isCodeRepit={isCodeRepit}
                    isNameRepit={isNameRepit}
                    isValidMaterialPayload={isValidMaterialPayload}
                    submit={getMode().method}
                />
            </Box>
            {/* SnackBar */}
            {openSnackBar ? showSnackBar() : null}
        </Page>
    )
}

MaterialScreen.propTypes = {
    mode: PropTypes.string,
};

export default MaterialScreen;
