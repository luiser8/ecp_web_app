import React, { useContext, useEffect, useState } from 'react';
import { Box, Stack, Typography, Stepper, Step, StepLabel, Button } from '@mui/material';
import Page from '../../../components/layouts/Page';
import FormProduct from '../forms/FormProduct';
import { Context } from '../../../auth/Context';
import SnackBarCustom from '../../../components/alerts/SnackBarCustom';
import { getProductCodeExists, postProduct } from '../../../services/productsService';
import FormProductMaterial from '../forms/FormProductMaterial';
import { getMaterialsSimple } from '../../../services/materialsService';
import FormResume from '../forms/FormResume';

const NewProductScreen = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [materials, setMaterials] = useState([]);
    const [productMaterial, setProductMaterial] = useState([]);
    const { checkUser } = useContext(Context);
    const userToken = checkUser().accesstoken;
    //Notificaciones
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [severitySnackBar, setSeverityOpenSnackBar] = useState("");
    const [msjSnackBar, setMsjOpenSnackBar] = useState("");
    const steps = ['Información del producto', 'Selecciona materias primas', 'Resumen'];
    //Payload formulario
    const [activeNext, setActiveNext] = useState(0);
    const [isCodeRepit, setIsCodeRepit] = useState(false);
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

    const isValidNext = () => {
        return activeStep === 1 ? (activeNext !== 0 ? false : true ) : false;
    }

    const isValidProductPayload = () => {
        return productPayload.code === ""
        || productPayload.name === ""
        || productPayload.description === ""
        || productPayload.presentation === ""
        || productPayload.boxes_x_mix === 0
        || productPayload.units_x_mix === 0
        || productPayload.status === "";
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
        productPayload.status === "";
    }

    const checkCodeExists = (code) => {
        (Promise.all([
            getProductCodeExists(code, userToken).then((values) => {
                if (values !== null) {
                    setIsCodeRepit(values !== undefined ? values : isCodeRepit);
                }
            }),
        ]).catch(error => {
            new Error(error);
        }));
    }

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
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
            console.log(productMaterial);
        }

        if (activeStep === steps.length - 1) {
            postProducts();
        }
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
        setProductMaterial([]);
    };

    const settingsSnackBar = (severity, msj, show) => {
        setSeverityOpenSnackBar(severity);
        setMsjOpenSnackBar(msj);
        setOpenSnackBar(show);
    }

    const getMaterials = async () => {
        (Promise.all([
            getMaterialsSimple(userToken).then((values) => {
                if (values !== null) {
                    setMaterials(values !== undefined ? values : []);
                }
            }),
        ]).catch(error => {
            new Error(error);
        }));
    }

    const postProducts = async () => {
        (Promise.all([
            postProduct(productPayload, userToken).then((values) => {
                if (values !== null) {
                    settingsSnackBar("success", "Producto guardado!", true);
                    resetProductPayload();
                }
            }),
        ]).catch(error => {
            new Error(error);
        }));
        resetProductPayload();
    }

    useEffect(() => {
        getMaterials();
        return () => {
            setMaterials([]);
        };
    }, [activeNext]);

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
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={() => setActiveStep(0)}>Reiniciar</Button>
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
                                    checkCodeExists={checkCodeExists}
                                    isCodeRepit={isCodeRepit}
                                /> : <></>
                            }
                            {activeStep === 1 ?
                                <FormProductMaterial
                                    mode="new"
                                    materials={materials}
                                    productMaterial={productMaterial}
                                    setProductMaterial={setProductMaterial}
                                    setActiveNext={setActiveNext}
                                /> : <></>
                            }
                            {activeStep === 2 ?
                                <FormResume
                                    mode="new"
                                    productPayload={productPayload}
                                    productMaterial={productMaterial}
                                    setProductMaterial={setProductMaterial}
                                /> : <></>
                            }
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 1 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
                                sx={{ mr: 1 }}
                            >
                                Atrás
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Saltar
                                </Button>
                            )}
                            <Button 
                                onClick={handleNext} 
                                disabled={isValidProductPayload() || isValidNext() || isCodeRepit}>
                                {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
            {/* SnackBar */}
            <SnackBarCustom
                open={openSnackBar}
                setOpen={setOpenSnackBar}
                vertical="top"
                horizontal="right"
                severityOption={severitySnackBar}
                msj={msjSnackBar}
            />
        </Page>
    )
}

export default NewProductScreen;
