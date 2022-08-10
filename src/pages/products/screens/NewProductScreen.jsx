import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Box, Stack, Typography, Stepper, Step, StepLabel, Button } from '@mui/material';
import Page from '../../../components/layouts/Page';
import FormProduct from '../forms/FormProduct';
import { Context } from '../../../auth/Context';
import SnackBarCustom from '../../../components/alerts/SnackBarCustom';
import { getProductExists, postProduct } from '../../../client/productsClient';
import FormProductMaterial from '../forms/FormProductMaterial';
import { getMaterialsSimple } from '../../../client/materialsClient';
import FormResume from '../forms/FormResume';
import { NavLink } from 'react-router-dom';
import FormProductKits from '../forms/FormProductKits';
import { getPackingKitSimple } from '../../../client/packingKitsClient';
import SuccessAdd from '../../../components/alerts/SuccessAdd';

const NewProductScreen = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [materials, setMaterials] = useState([]);
    const [packingKits, setPackingkits] = useState([]);
    const [productMaterial, setProductMaterial] = useState([]);
    const [productMaterialResume, setProductMaterialResume] = useState([]);
    const [productPackingkits, setProductPackingkits] = useState([]);
    const [productPackingkitsResume, setProductPackingkitsResume] = useState([]);
    const { checkUser } = useContext(Context);
    const userToken = checkUser().accesstoken;
    //Notificaciones
    const [openSnackBar, setOpenSnackBar] = useState(false);
    //Payload formulario
    const [product, setProduct] = useState("");
    const [activeNextMaterial, setActiveNextMaterial] = useState(true);
    const [activeNextPackingkits, setActiveNextPackingkits] = useState(true);
    const [isCodeRepit, setIsCodeRepit] = useState(false);
    const [isNameRepit, setIsNameRepit] = useState(false);
    const [errorMaterialCurrentAmount, setErrorMaterialCurrentAmount] = useState({ index: 0, error: false });
    const [errorKitsCurrentAmount, setErrorKitsCurrentAmount] = useState({ index: 0, error: false });
    const [productPayload, setProductPayload] = useState(
        {
            "code": "",
            "name": "",
            "description": "",
            "presentation": "",
            "boxes_x_mix": 0,
            "units_x_mix": 0,
            "margin_of_gain": 0,
            "pvp_x_boxes": 0,
            "pvp_x_units": 0,
            "materials": [],
            "packing_kits": [],
            "status": "in process"
        }
    );

    const steps = ['Información del producto', 'Selecciona materias primas','Selecciona herramientas de embalaje', 'Resumen y guardar'];

    const isValidNextMaterial = () => {
        if(activeStep === 1){
            return activeNextMaterial;
        }
        return false;
    }

    const isValidNextPackingKit = () => {
        if(activeStep === 2){
            return activeNextPackingkits;
        }
        return false;
    }

    const isValidProductPayload = () => {
        return productPayload.code === ""
        || productPayload.name === ""
        || productPayload.description === ""
        || productPayload.presentation === ""
        || productPayload.boxes_x_mix === 0
        || productPayload.units_x_mix === 0;
    }

    const resetProductPayload = () => {
        productPayload.code = "";
        productPayload.name = "";
        productPayload.description = "";
        productPayload.presentation = "";
        productPayload.boxes_x_mix = 0;
        productPayload.units_x_mix = 0;
        productPayload.margin_of_gain = 0;
        productPayload.pvp_x_boxes = 0;
        productPayload.pvp_x_units = 0;
        productPayload.materials = [];
        productPayload.packing_kits = [];
        setProductMaterial([]);
        setProductMaterialResume([]);
        setProductPackingkits([]);
        setProductPackingkitsResume([]);
    }

    const isStepOptional = (step) => {
        if(step === 1){
            return 1;
        }else if (step === 2){
            return 2;
        }
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const stepResets = () => {
        setActiveStep(0);
        resetProductPayload();
    };

    const handleNext = async () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);

        if (activeStep === 1) {
            setProductPayload((payload) => ({
                ...payload,
                "materials": productMaterial,
            }));
        }

        if (activeStep === 2) {
            setProductPayload((payload) => ({
                ...payload,
                "packing_kits": productPackingkits,
            }));
        }

        if (activeStep === steps.length - 1) {
            await postProducts();
        }
    };

    const handleSkip = async () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        if (activeStep === 1) {
            setProductMaterial([]); setProductMaterialResume([]);
        }

        if (activeStep === 2) {
            setProductPackingkits([]); setProductPackingkitsResume([]);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const showSnackBar = () => {
        return (
          <SnackBarCustom
            open={openSnackBar}
            setOpen={setOpenSnackBar}
            vertical="top"
            horizontal="right"
            severityOption={"success"}
            msj={"Producto guardado!"}
          />
        )
    }

    const checkCodeOrNameExists = async (type, value) => {
        if(value === ""){
            if (type === "code") {
                setIsCodeRepit(false);
            } else {
                setIsNameRepit(false);
            }
            return;
        }
        (Promise.all([
            await getProductExists(type, value, userToken).then((values) => {
                if (values !== null) {
                    if (type === "code") {
                        setIsCodeRepit(values !== undefined ? values : isCodeRepit);
                    }if (type === "name") {
                        setIsNameRepit(values !== undefined ? values : isNameRepit);
                    }
                }
            }),
        ]).catch(error => {
            new Error(error);
        }));
    }

    const getMaterials = async () => {
        (Promise.all([
            await getMaterialsSimple(userToken).then((values) => {
                if (values !== null) {
                    setMaterials(values !== undefined ? values : []);
                }
            }),
        ]).catch(error => {
            new Error(error);
        }));
    }

    const getPackingKits = async () => {
        (Promise.all([
            await getPackingKitSimple(userToken).then((values) => {
                if (values !== null) {
                    setPackingkits(values !== undefined ? values : []);
                }
            }),
        ]).catch(error => {
            new Error(error);
        }));
    }

    const postProducts = async () => {
        (Promise.all([
            await postProduct(productPayload, userToken).then((values) => {
                if (values !== null) {
                    setOpenSnackBar(true);
                    resetProductPayload();
                    setProduct(values);
                }
            }),
        ]).catch(error => {
            new Error(error);
        }));
        resetProductPayload();
    }

    useEffect(() => {
        getMaterials();
        getPackingKits();
        isValidNextMaterial();
        return () => {
            setMaterials([]);
            setPackingkits([]);
        };
    }, [activeNextMaterial]);

    return (
        <Page title="Nuevo producto">
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography variant="h4" gutterBottom>
                    Productos / Nuevo
                </Typography>
            </Stack>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">Opcional</Typography>
                            );
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Fragment>
                            <SuccessAdd />
                        </Fragment>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button sx={{ mr: 1 }} variant="contained" LinkComponent={NavLink} to={"/"}>Volver</Button>
                            <Button sx={{ mr: 1 }} variant="contained" LinkComponent={NavLink} to={`/product/${product}`}>Ver producto</Button>
                            <Button variant="contained" onClick={() => setActiveStep(0)}>Volver a crear</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            {activeStep === 0 ?
                                <FormProduct
                                    mode="new"
                                    productPayload={productPayload}
                                    setProductPayload={setProductPayload}
                                    checkCodeOrNameExists={checkCodeOrNameExists}
                                    isCodeRepit={isCodeRepit}
                                    isNameRepit={isNameRepit}
                                /> : <></>
                            }
                            {activeStep === 1 ?
                                <FormProductMaterial
                                    mode="new"
                                    materials={materials}
                                    productMaterial={productMaterial}
                                    setProductMaterial={setProductMaterial}
                                    productMaterialResume={productMaterialResume}
                                    setProductMaterialResume={setProductMaterialResume}
                                    setActiveNextMaterial={setActiveNextMaterial}
                                    errorMaterialCurrentAmount={errorMaterialCurrentAmount}
                                    setErrorMaterialCurrentAmount={setErrorMaterialCurrentAmount}
                                /> : <></>
                            }
                            {activeStep === 2 ?
                                <FormProductKits
                                    mode="new"
                                    packingKits={packingKits}
                                    productPackingkits={productPackingkits}
                                    setProductPackingkits={setProductPackingkits}
                                    productPackingkitsResume={productPackingkitsResume}
                                    setProductPackingkitsResume={setProductPackingkitsResume}
                                    setActiveNextPackingkits={setActiveNextPackingkits}
                                    errorKitsCurrentAmount={errorKitsCurrentAmount}
                                    setErrorKitsCurrentAmount={setErrorKitsCurrentAmount}
                                /> : <></>
                            }
                            {activeStep === 3 ?
                                <FormResume
                                    productPayload={productPayload}
                                    productMaterialResume={productMaterialResume}
                                    productPackingkitsResume={productPackingkitsResume}
                                /> : <></>
                            }
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 1 }}>
                            <Button
                                color="inherit"
                                variant="contained"
                                disabled={activeStep === 0}
                                onClick={() => activeStep === 3 ? stepResets(0) : setActiveStep((prevActiveStep) => prevActiveStep - 1)}
                                sx={{ mr: 1 }}
                            >
                            {activeStep === 3 ? "Cancelar" : "Atrás"}
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                                <Button variant="contained" color="inherit" onClick={async () => handleSkip()} sx={{ mr: 1 }}>
                                    Saltar
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                onClick={async () => handleNext()}
                                disabled={isValidProductPayload() || isValidNextMaterial() || isValidNextPackingKit() || isCodeRepit || isNameRepit || errorMaterialCurrentAmount.error || errorKitsCurrentAmount.error}>
                                {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
            {/* SnackBar */}
            {openSnackBar ? showSnackBar() : null}
        </Page>
    )
}

export default NewProductScreen;
