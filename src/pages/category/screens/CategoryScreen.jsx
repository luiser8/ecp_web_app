import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';
import Page from '../../../components/layouts/Page';
import { Context } from '../../../auth/Context';
import SnackBarCustom from '../../../components/alerts/SnackBarCustom';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategoriesByIdService, getCategoriesExistsService, postCategoriesService, putCategoriesService } from '../../../services/categoryService';
import FormCategory from '../forms/FormCategory';

const CategoryScreen = ({ mode }) => {
    const { checkUser } = useContext(Context);
    const userToken = checkUser().accesstoken;
    //Router, params / navigate
    let { id } = useParams();
    const navigate = useNavigate();
    //Notificaciones
    const [openSnackBar, setOpenSnackBar] = useState(false);
    //Payload formulario
    const [isNameRepit, setIsNameRepit] = useState(false);
    const [categoryPayload, setCategoryPayload] = useState(
        {
            "name": "",
            "description": "",
            "dad": "",
            "status": true
        }
    );

    const dads = [
        { "id": 1, "name": "product", "view": "Producto" },
        { "id": 2, "name": "material", "view": "Material" },
        { "id": 3, "name": "kits", "view": "Herramienta de embalaje" },
        { "id": 4, "name": "others", "view": "Otros gastos" }
    ];

    const getMode = () => {
        return {
            title: mode === "new" ? "Nueva categoría" : "Editar categoría",
            msj: mode === "new" ? "Categoría / Nuevo" : "Categorías / Editar",
            method: mode === "new" ? postCategories : putCategories
        }
    }

    const resetCategoryPayload = () => {
        categoryPayload.name = "";
        categoryPayload.description = "";
        categoryPayload.dad = "";
        categoryPayload.status = null;
    }

    const isValidCategoryPayload = () => {
        return categoryPayload.name === ""
            || categoryPayload.description === ""
            || categoryPayload.dad === ""
            || categoryPayload.status === null;
    }

    const showSnackBar = () => {
        return (
            <SnackBarCustom
                open={openSnackBar}
                setOpen={setOpenSnackBar}
                vertical="top"
                horizontal="right"
                severityOption={"success"}
                msj={"Categoría guardada!"}
            />
        )
    }

    const redirect = () => {
        const timer = setTimeout(() => {
            navigate("/categories");
        }, 2000);
        return () => clearTimeout(timer);
    }

    const checkCodeOrNameExists = async (type, value) => {
        if (value === "") {
            if (type === "name"){
                setIsNameRepit(false);
            }
            return;
        }
        const categories = await getCategoriesExistsService(type, value, userToken);
        if (type === "name") {
            setIsNameRepit(categories !== undefined ? categories : isNameRepit);
        }
    }

    const getCategories = async () => {
        const categoriesItem = await getCategoriesByIdService(id, userToken);
        if (categoriesItem !== undefined || null) {
            setCategoryPayload({ ...categoryPayload, ...categoriesItem });
        }
    }

    const postCategories = async () => {
        const payload = await postCategoriesService(categoryPayload, userToken);
        if (payload !== null) {
            setOpenSnackBar(true); resetCategoryPayload();
        }
        resetCategoryPayload();
    }

    const putCategories = async () => {
        const payload = await putCategoriesService(id, categoryPayload, userToken);
        if (payload !== null) {
            setOpenSnackBar(true); resetCategoryPayload();
        }
        resetCategoryPayload();
        redirect();
    }

    useEffect(() => {
        if (mode === "edit") {
            getCategories();
        } else {
            null;
        } return () => {};
    }, []);

    return (
        <Page title={getMode().title}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0} mt={-1}>
                <Typography variant="h4" gutterBottom>{getMode().msj}</Typography>
            </Stack>
            <Box sx={{ width: '100%' }}>
                <FormCategory
                    mode={mode}
                    dads={dads}
                    categoryPayload={categoryPayload}
                    setCategoryPayload={setCategoryPayload}
                    checkCodeOrNameExists={checkCodeOrNameExists}
                    isNameRepit={isNameRepit}
                    isValidCategoryPayload={isValidCategoryPayload}
                    submit={getMode().method}
                />
            </Box>
            {/* SnackBar */}
            {openSnackBar ? showSnackBar() : null}
        </Page>
    )
}

CategoryScreen.propTypes = {
    mode: PropTypes.string,
};

export default CategoryScreen;
