import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';
import Page from '../../../components/layouts/Page';
import { Context } from '../../../auth/Context';
import SnackBarCustom from '../../../components/alerts/SnackBarCustom';
import { useParams, useNavigate } from 'react-router-dom';
import { getSupplierByIdService, getSuppliersExistsService, postSupplierService, putSupplierService } from '../../../services/supplierService';
import FormSupplier from '../forms/FormSupplier';

const SupplierScreen = ({ mode }) => {
    const { checkUser } = useContext(Context);
    const userToken = checkUser().accesstoken;
    //Router, params / navigate
    let { id } = useParams();
    const navigate = useNavigate();
    //Notificaciones
    const [openSnackBar, setOpenSnackBar] = useState(false);
    //Payload formulario
    const [isIdRepit, setIsIdRepit] = useState(false);
    const [isNameRepit, setIsNameRepit] = useState(false);
    const [isEmailRepit, setIsEmailRepit] = useState(false);
    const [isPhoneRepit, setIsPhoneRepit] = useState(false);
    const [supplierPayload, setSupplierPayload] = useState(
        {
            "identifier": "",
            "type": "",
            "name": "",
            "description": "",
            "email": "",
            "phone": "",
            "address": "",
            "status": true
        }
    );

    const getMode = () => {
        return {
            title: mode === "new" ? "Nuevo proveedor" : "Editar proveedor",
            msj: mode === "new" ? "Proveedor / Nuevo" : "Proveedor / Editar",
            method: mode === "new" ? postSupplier : putSupplier
        }
    }

    const resetSupplierPayload = () => {
        supplierPayload.identifier = "";
        supplierPayload.type = "";
        supplierPayload.name = "";
        supplierPayload.description = "";
        supplierPayload.email = "";
        supplierPayload.phone = "";
        supplierPayload.address = "";
        supplierPayload.status = null;
    }

    const isValidSupplierPayload = () => {
        return supplierPayload.identifier === ""
            || supplierPayload.type === ""
            || supplierPayload.name === ""
            || supplierPayload.description === ""
            || supplierPayload.email === ""
            || supplierPayload.phone === ""
            || supplierPayload.address === ""
            || supplierPayload.status === null;
    }

    const showSnackBar = () => {
        return (
            <SnackBarCustom
                open={openSnackBar}
                setOpen={setOpenSnackBar}
                vertical="top"
                horizontal="right"
                severityOption={"success"}
                msj={"Proveedor guardado!"}
            />
        )
    }

    const redirect = () => {
        const timer = setTimeout(() => {
            navigate("/suppliers");
        }, 2000);
        return () => clearTimeout(timer);
    }

    const checkCodeOrNameExists = async (type, value) => {
        if (value === "") {
            if (type === "identifier") {
                setIsIdRepit(false);
            } if (type === "name"){
                setIsNameRepit(false);
            }if (type === "email"){
                setIsEmailRepit(false);
            }if (type === "phone"){
                setIsPhoneRepit(false);
            }
            return;
        }
        const supplier = await getSuppliersExistsService(type, value, userToken);
        if (type === "identifier") {
            setIsIdRepit(supplier !== undefined ? supplier : isIdRepit);
        } if (type === "name") {
            setIsNameRepit(supplier !== undefined ? supplier : isNameRepit);
        }if (type === "email") {
            setIsEmailRepit(supplier !== undefined ? supplier : isEmailRepit);
        }if (type === "phone") {
            setIsPhoneRepit(supplier !== undefined ? supplier : isPhoneRepit);
        }
    }

    const getSupplier = async () => {
        const supplierItem = await getSupplierByIdService(id, userToken);
        if (supplierItem !== undefined || null) {
            setSupplierPayload({ ...supplierPayload, ...supplierItem });
        }
    }

    const postSupplier = async () => {
        const payload = await postSupplierService(supplierPayload, userToken);
        if (payload !== null) {
            setOpenSnackBar(true); resetSupplierPayload();
        }
        resetSupplierPayload();
    }

    const putSupplier = async () => {
        const payload = await putSupplierService(id, supplierPayload, userToken);
        if (payload !== null) {
            setOpenSnackBar(true); resetSupplierPayload();
        }
        resetSupplierPayload();
        redirect();
    }

    useEffect(() => {
        if (mode === "edit") {
            getSupplier();
        } else {
            null;
        } return () => {};
    }, []);

    return (
        <Page title={getMode().title}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography variant="h4" gutterBottom>{getMode().msj}</Typography>
            </Stack>
            <Box sx={{ width: '100%' }}>
                <FormSupplier
                    mode={mode}
                    supplierPayload={supplierPayload}
                    setSupplierPayload={setSupplierPayload}
                    checkCodeOrNameExists={checkCodeOrNameExists}
                    isIdRepit={isIdRepit}
                    isNameRepit={isNameRepit}
                    isEmailRepit={isEmailRepit}
                    isPhoneRepit={isPhoneRepit}
                    isValidSupplierPayload={isValidSupplierPayload}
                    submit={getMode().method}
                />
            </Box>
            {/* SnackBar */}
            {openSnackBar ? showSnackBar() : null}
        </Page>
    )
}

SupplierScreen.propTypes = {
    mode: PropTypes.string,
};

export default SupplierScreen;
