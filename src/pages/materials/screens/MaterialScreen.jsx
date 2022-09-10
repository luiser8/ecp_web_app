import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';
import Page from '../../../components/layouts/Page';
import { Context } from '../../../auth/Context';
import SnackBarCustom from '../../../components/alerts/SnackBarCustom';
import FormMaterial from '../forms/FormMaterial';
import { getMaterialByIdService, getMaterialsExistsService, postMaterialService, putMaterialService } from '../../../services/materialsService';
import { getUnitsSimpleService } from '../../../services/unitsService';
import { getSuppliersSimpleService } from '../../../services/suppliersService';
import { useParams, useNavigate } from 'react-router-dom';

const MaterialScreen = ({ mode }) => {
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
    const [materialPayload, setMaterialPayload] = useState(
        {
            "unit": "",
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
        const material = await getMaterialsExistsService(type, value, userToken);
        if (type === "code") {
            setIsCodeRepit(material !== undefined ? material : isCodeRepit);
        } if (type === "name") {
            setIsNameRepit(material !== undefined ? material : isNameRepit);
        }
    }

    const getUnits = async () => {
        setUnits(await getUnitsSimpleService(userToken));
    }

    const getSuppliers = async () => {
        setSuppliers(await getSuppliersSimpleService(userToken));
    }

    const getMaterial = async () => {
        const materialItem = await getMaterialByIdService(id, userToken);
        if (materialItem !== undefined || null) {
            materialItem.unit = materialItem.unit._id;
            materialItem.supplier = materialItem.supplier._id;
            setMaterialPayload({ ...materialPayload, ...materialItem });
        }
    }

    const postMaterial = async () => {
        const payload = await postMaterialService(materialPayload, userToken);
        if (payload !== null) {
            setOpenSnackBar(true); resetMaterialPayload();
        }
        resetMaterialPayload();
    }

    const putMaterial = async () => {
        const payload = await putMaterialService(id, materialPayload, userToken);
        if (payload !== null) {
            setOpenSnackBar(true); resetMaterialPayload();
        }
        resetMaterialPayload();
        redirect();
    }

    useEffect(() => {
        if (mode === "edit") {
            getMaterial();
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
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0} mt={-1}>
                <Typography variant="h4" gutterBottom>{getMode().msj}</Typography>
            </Stack>
            <Box sx={{ width: '100%' }}>
                <FormMaterial
                    mode={mode}
                    units={units}
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
