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

const FormProductKits = 
    ({ 
        mode, 
        packingKits, 
        productPackingkits, 
        setProductPackingkits, 
        productPackingkitsResume, 
        setProductPackingkitsResume, 
        setActiveNextPackingkits 
        
    }) => {
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState(packingKits);
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

        if(checked.length === productPackingkits.length){
            setProductPackingkits([]); setProductPackingkitsResume([]);
            return;
        }

        checked.forEach((_) => {
            const packingKits = productPackingkits.findIndex(pm => pm.packing_kit === _._id);
            const packingKitsResume = productPackingkitsResume.findIndex(pm => pm.packing_kit === _._id);
            removePackingkit(packingKits);
            removePackingkitResume(packingKitsResume);
        });
        checkValidNext();
    };

    const removePackingkit = (index) => {
        setProductPackingkits([
            ...productPackingkits.slice(0, index),
            ...productPackingkits.slice(index + 1, productPackingkits.length)
        ]);
    }

    const removePackingkitResume = (index) => {
        setProductPackingkitsResume([
            ...productPackingkitsResume.slice(0, index),
            ...productPackingkitsResume.slice(index + 1, productPackingkitsResume.length)
        ]);
    }

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));

        checked.forEach((item) => {
            setProductPackingkits(productPackingkits => [...productPackingkits, {
                "packing_kit": item._id,
                "cost_unit_x_mix": 0,
                "qty_x_box": 0
            }]);
            setProductPackingkitsResume(productPackingkitsResume => [...productPackingkitsResume, {
                "packing_kit": item._id,
                "code": item.code,
                "name": item.name,
                "cost_unit_x_mix": 0,
                "qty_x_box": 0
            }]);
        });
        checkValidNext();
    };

    const handleChanges = (ev, index) => {
        const { name, value } = ev.target;

        const packingKit = productPackingkits.findIndex(pm => pm.packing_kit === index);
        const packingKitResume = productPackingkitsResume.findIndex(pm => pm.packing_kit === index);

        if (name === "cost_unit_x_mix") {
            productPackingkits[packingKit].cost_unit_x_mix = Number(value);
            productPackingkitsResume[packingKitResume].cost_unit_x_mix = Number(value);
        } else if (name === "qty_x_box") {
            productPackingkits[packingKit].qty_x_box = Number(value);
            productPackingkitsResume[packingKitResume].qty_x_box = Number(value);
        }
        checkValidNext();
    }

    const checkValidNext = () => {
        let suma_cost_unit_x_mix = 0;
        let suma_qty_x_box = 0;
        productPackingkits.map((_, index) => {
            suma_cost_unit_x_mix += productPackingkits[index].cost_unit_x_mix;
            suma_qty_x_box += productPackingkits[index].qty_x_box;
        });
        setActiveNextPackingkits(suma_cost_unit_x_mix + suma_qty_x_box);
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
                        const stock = !type ? `Stock ${items[value].current_amount} -` : '';
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
                                    />
                                </ListItemIcon>

                                <ListItemText id={labelId} primary={`${items[value].code} - ${stock} ${items[value].name}`} />
                                {type ?
                                    <Fragment>
                                        <TextField
                                            defaultValue={0}
                                            onChange={(ev) => handleChanges(ev, items[value]._id)}
                                            margin="normal"
                                            required
                                            type="number"
                                            id="cost_unit_x_mix"
                                            label="Costo un x mezcla"
                                            name="cost_unit_x_mix"
                                            size="small"
                                            sx={{ width: "150px" }}
                                        />
                                        <TextField
                                            defaultValue={0}
                                            onChange={(ev) => handleChanges(ev, items[value]._id)}
                                            margin="normal"
                                            required
                                            type="number"
                                            id="qty_x_box"
                                            label="Cantidad x caja"
                                            name="qty_x_box"
                                            size="small"
                                            sx={{ width: "150px" }}
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
                <Grid item>{customList(true, 'Kits de embalaje escogidos', left)}</Grid>
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
                <Grid item>{customList(false, 'Kits de embalaje actual', right)}</Grid>
            </Box>
        </Grid>
    )
}

FormProductKits.propTypes = {
    mode: PropTypes.string,
    packingKits: PropTypes.array,
    productPackingkits: PropTypes.array,
    setProductPackingkits: PropTypes.func,
    productPackingkitsResume: PropTypes.array,
    setProductPackingkitsResume: PropTypes.func,
    setActiveNextPackingkits: PropTypes.func,
};

export default FormProductKits;