import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';
import Page from '../../../components/layouts/Page';
import { Context } from '../../../auth/Context';
import SnackBarCustom from '../../../components/alerts/SnackBarCustom';
import { useParams, useNavigate } from 'react-router-dom';
import { getOtherExpensesByIdService, getOtherExpensesExistsService, postOtherExpensesService, putOtherExpensesService } from '../../../services/otherExpensesService';
import FormOtherExpenses from '../forms/FormOtherExpenses';
import { getCategoriesByDadService } from '../../../services/categoryService';

const OtherExpensesScreen = ({ mode }) => {
    const { checkUser, setOpenSessionExpired } = useContext(Context);
    const userToken = checkUser().accesstoken;
    //Router, params / navigate
    let { id } = useParams();
    const navigate = useNavigate();
    //Notificaciones
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [categories, setCategories] = useState([]);
    //Payload formulario
    const [isCodeRepit, setIsCodeRepit] = useState(false);
    const [isNameRepit, setIsNameRepit] = useState(false);
    const [otherExpensesPayload, setOtherExpensesPayload] = useState(
        {
            "code": "",
            "category": "",
            "name": "",
            "description": "",
            "in_use": false,
            "status": true
        }
    );

    const getMode = () => {
        return {
            title: mode === "new" ? "Nuevo gasto" : "Editar gasto",
            msj: mode === "new" ? "Gastos / Nuevo" : "Gastos / Editar",
            method: mode === "new" ? postOtherExpenses : putOtherExpenses
        }
    }

    const resetOtherExpensesPayload = () => {
        otherExpensesPayload.code = "";
        otherExpensesPayload.category = "";
        otherExpensesPayload.name = "";
        otherExpensesPayload.description = "";
        otherExpensesPayload.in_use = null;
        otherExpensesPayload.status = null;
    }

    const isValidOtherExpensesPayload = () => {
        return otherExpensesPayload.code === ""
            || otherExpensesPayload.category === ""
            || otherExpensesPayload.name === ""
            || otherExpensesPayload.description === ""
            || otherExpensesPayload.in_use === null
            || otherExpensesPayload.status === null;
    }

    const showSnackBar = () => {
        return (
            <SnackBarCustom
                open={openSnackBar}
                setOpen={setOpenSnackBar}
                vertical="top"
                horizontal="right"
                severityOption={"success"}
                msj={"Gasto guardado!"}
            />
        )
    }

    const redirect = () => {
        const timer = setTimeout(() => {
            navigate("/otherexpenses");
        }, 2000);
        return () => clearTimeout(timer);
    }

    const checkCodeOrNameExists = async (type, value) => {
        if (value === "") {
            if (type === "code"){
                setIsCodeRepit(false);
            }
            if (type === "name"){
                setIsNameRepit(false);
            }
            return;
        }
        const { data, error } = await getOtherExpensesExistsService(type, value, userToken);
        if (error === "Invalid Token") {
            setOpenSessionExpired(true);
        }
        if (type === "code") {
            setIsCodeRepit(data !== undefined ? data : isCodeRepit);
        }
        if (type === "name") {
            setIsNameRepit(data !== undefined ? data : isNameRepit);
        }
    }

    const getOtherExpenses = async (userToken) => {
        const { data, error } = await getOtherExpensesByIdService(id, userToken);
        if (error === "Invalid Token") {
            setOpenSessionExpired(true);
        }
        if (data !== undefined || null) {
            data.category = data.category._id;
            setOtherExpensesPayload({ ...otherExpensesPayload, ...data });
        }
    }

    const getCategories = async (userToken) => {
        const { data, error } = await getCategoriesByDadService("others", userToken);
        if (error === "Invalid Token") {
            setOpenSessionExpired(true);
        }
        setCategories(data);
    }

    const postOtherExpenses = async () => {
        const { data, error } = await postOtherExpensesService(otherExpensesPayload, userToken);
        if (error === "Invalid Token") {
            setOpenSessionExpired(true);
        }
        if (data !== null) {
            setOpenSnackBar(true); resetOtherExpensesPayload();
        }
        resetOtherExpensesPayload();
    }

    const putOtherExpenses = async () => {
        const { data, error } = await putOtherExpensesService(id, otherExpensesPayload, userToken);
        if (error === "Invalid Token") {
            setOpenSessionExpired(true);
        }
        if (data !== null) {
            setOpenSnackBar(true); resetOtherExpensesPayload();
        }
        resetOtherExpensesPayload();
        redirect();
    }

    useEffect(() => {
        if (mode === "edit") {
            getOtherExpenses(userToken);
        } else {
            null;
        }
        getCategories(userToken);
        return () => {
            setCategories([]);
        };
    }, []);

    return (
        <Page title={getMode().title}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0} mt={-1}>
                <Typography variant="h4" gutterBottom>{getMode().msj}</Typography>
            </Stack>
            <Box sx={{ width: '100%' }}>
                <FormOtherExpenses
                    mode={mode}
                    categories={categories}
                    otherExpensesPayload={otherExpensesPayload}
                    setOtherExpensesPayload={setOtherExpensesPayload}
                    checkCodeOrNameExists={checkCodeOrNameExists}
                    isCodeRepit={isCodeRepit}
                    isNameRepit={isNameRepit}
                    isValidOtherExpensesPayload={isValidOtherExpensesPayload}
                    submit={getMode().method}
                />
            </Box>
            {/* SnackBar */}
            {openSnackBar ? showSnackBar() : null}
        </Page>
    )
}

OtherExpensesScreen.propTypes = {
    mode: PropTypes.string,
};

export default OtherExpensesScreen;
