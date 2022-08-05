import { Box, Button, Card, CardHeader, Checkbox, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const not = (a, b) => {
    return a.filter((value) => !b.includes(value));
}

const intersection = (a, b) => {
    return a.filter((value) => b.includes(value));
}

const union = (a, b) => {
    return [...a, ...not(b, a)];
}

const FormProductMaterial =
    ({
        mode,
        materials,
        productMaterial,
        setProductMaterial,
        productMaterialResume,
        setProductMaterialResume,
        setActiveNextMaterial,
        errorMaterialCurrentAmount,
        setErrorMaterialCurrentAmount
    }) => {
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState(materials);
    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));

        if(checked.length === productMaterial.length){
            setProductMaterial([]); setProductMaterialResume([]);
            return;
        }

        checked.forEach((_) => {
            const material = productMaterial.findIndex(pm => pm.material === _._id);
            const materialResumen = productMaterialResume.findIndex(pm => pm.material === _._id);
            removeMaterial(material);
            removeMaterialResume(materialResumen);
        });
        checkValidNext();
    };

    const removeMaterial = (index) => {
        setProductMaterial([
            ...productMaterial.slice(0, index),
            ...productMaterial.slice(index + 1, productMaterial.length)
        ]);
    }

    const removeMaterialResume = (index) => {
        setProductMaterialResume([
            ...productMaterialResume.slice(0, index),
            ...productMaterialResume.slice(index + 1, productMaterialResume.length)
        ]);
    }

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));

        checked.forEach((item) => {
            setProductMaterial(productMaterial => [...productMaterial, {
                "material": item._id,
                "qty_x_mix": 0,
                "cost_x_mix": 0
            }]);
            setProductMaterialResume(productMaterialResume => [...productMaterialResume, {
                "material": item._id,
                "code": item.code,
                "name": item.name,
                "qty_x_mix": 0,
                "cost_x_mix": 0
            }]);
        });
        checkValidNext();
    };

    const handleChanges = (ev, index, key) => {
        const { name, value } = ev.target;

        const material = productMaterial.findIndex(pm => pm.material === index);
        const materialResume = productMaterialResume.findIndex(pm => pm.material === index);

        if (name === "qty_x_mix") {
            const materialCurrentAmount = materials.filter((item) => item._id === productMaterial[material].material);

            if(Number(value) > materialCurrentAmount[0].current_amount){
                setErrorMaterialCurrentAmount({...errorMaterialCurrentAmount, index: key, error: true});
                return;
            }

            setErrorMaterialCurrentAmount({...errorMaterialCurrentAmount, index: key, error: false});

            productMaterial[material].qty_x_mix = Number(value);
            productMaterialResume[materialResume].qty_x_mix = Number(value);
        } else if (name === "cost_x_mix") {
            productMaterial[material].cost_x_mix = Number(value);
            productMaterialResume[materialResume].cost_x_mix = Number(value);
        }
        checkValidNext();
    }

    const checkValidNext = () => {
        productMaterial.map((_, index) => {
            const material = productMaterial[index];

            if(material.qty_x_mix === 0 || material.cost_x_mix === 0){
                setActiveNextMaterial(true);
            }else{
                setActiveNextMaterial(false);
            }
        });
    }

    const customList = (type, title, items) => (
        <Fragment>
            <Card>
                <CardHeader
                    sx={{ px: 1, py: 2 }}
                    avatar={
                        <Checkbox
                            onClick={handleToggleAll(items)}
                            checked={numberOfChecked(items) === items.length && items.length !== 0}
                            indeterminate={
                                numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                            }
                            disabled={items.length === 0}
                            inputProps={{
                                'aria-label': 'all items selected',
                            }}
                        />
                    }
                    title={title}
                    subheader={`${numberOfChecked(items)}/${items.length} seleccionado`}
                />
                <Divider />
                <List
                    sx={{
                        width: '100%',
                        height: 500,
                        bgcolor: 'background.paper',
                        overflow: 'auto',
                    }}
                    dense
                    component="div"
                    role="list"
                >
                    {Object.keys(items).map((value, index) => {
                        const labelId = `transfer-list-all-item-${value}-label`;
                        const stock = `Stock ${items[value].current_amount} -`;
                        return (
                            <ListItem
                                key={index}
                                role="listitem"
                                button
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        checked={checked.includes(items[value])}
                                        tabIndex={-1}
                                        disableRipple
                                        onChange={handleToggle(items[value])}
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }}
                                        sx={{ marginRight: -1 }}
                                    />
                                </ListItemIcon>

                                <ListItemText id={labelId} primary={`${items[value].code} - ${stock} ${items[value].name}`} />
                                {type ?
                                    <Fragment>
                                        <TextField
                                            defaultValue={0}
                                            onChange={(ev) => handleChanges(ev, items[value]._id, index)}
                                            margin="normal"
                                            required
                                            type="number"
                                            id="qty_x_mix"
                                            label={errorMaterialCurrentAmount.index === index ? (errorMaterialCurrentAmount.error ? "Sobrepasa stock" : "Cantidad x mezcla") : "Cantidad x mezcla"}
                                            name="qty_x_mix"
                                            size="small"
                                            error={errorMaterialCurrentAmount.index === index ? errorMaterialCurrentAmount.error : false}
                                            sx={{ width: "140px" }}
                                        />
                                        <TextField
                                            defaultValue={0}
                                            onChange={(ev) => handleChanges(ev, items[value]._id, index)}
                                            margin="normal"
                                            required
                                            type="number"
                                            id="cost_x_mix"
                                            label="Costo x mezcla"
                                            name="cost_x_mix"
                                            size="small"
                                            sx={{ width: "140px" }}
                                        />
                                    </Fragment>
                                    : <></>}
                            </ListItem>
                        );
                    })}
                    <ListItem />
                </List>
            </Card>
        </Fragment>
    );

    return (
        <Grid container spacing={1} justifyContent="center" alignItems="center">
            <Box sx={{ width: '55%' }}>
                <Grid item>{customList(true, 'Materia prima escogidos', left)}</Grid>
            </Box>
            <Grid sx={{ padding: 1 }}>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Box sx={{ width: '35%' }}>
                <Grid item>{customList(false, 'Materia prima actual', right)}</Grid>
            </Box>
        </Grid>
    )
}

FormProductMaterial.propTypes = {
    mode: PropTypes.string,
    materials: PropTypes.array,
    productMaterial: PropTypes.array,
    setProductMaterial: PropTypes.func,
    productMaterialResume: PropTypes.array,
    setProductMaterialResume: PropTypes.func,
    setActiveNextMaterial: PropTypes.func,
    errorMaterialCurrentAmount: PropTypes.object,
    setErrorMaterialCurrentAmount: PropTypes.func,
};

export default FormProductMaterial;
