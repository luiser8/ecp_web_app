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

const FormOtherExpenses =
    ({
        mode,
        othersExpenses,
        productOthersExpenses,
        setProductOthersExpenses,
        productOthersExpensesResume,
        setProductOthersExpensesResume,
        setActiveNextOthersExpenses

    }) => {
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState(othersExpenses);
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

        if(checked.length === productOthersExpenses.length){
            setProductOthersExpenses([]); setProductOthersExpensesResume([]);
            return;
        }

        checked.forEach((_) => {
            const otherExpenses = productOthersExpenses.findIndex(oe => oe.other_expenses === _._id);
            const otherExpensesResume = productOthersExpensesResume.findIndex(oe => oe.other_expenses === _._id);
            removeOtherExpenses(otherExpenses);
            removeOtherExpensesResume(otherExpensesResume);
        });
        checkValidNext();
    };

    const removeOtherExpenses = (index) => {
        setProductOthersExpenses([
            ...productOthersExpenses.slice(0, index),
            ...productOthersExpenses.slice(index + 1, productOthersExpenses.length)
        ]);
    }

    const removeOtherExpensesResume = (index) => {
        setProductOthersExpensesResume([
            ...productOthersExpensesResume.slice(0, index),
            ...productOthersExpensesResume.slice(index + 1, productOthersExpensesResume.length)
        ]);
    }

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));

        checked.forEach((item) => {
            setProductOthersExpenses(productOthersExpenses => [...productOthersExpenses, {
                "other_expenses": item._id,
                "total_cost_demanded": 0
            }]);
            setProductOthersExpensesResume(productOthersExpensesResume => [...productOthersExpensesResume, {
                "other_expenses": item._id,
                "code": item.code,
                "name": item.name,
                "total_cost_demanded": 0
            }]);
        });
        checkValidNext();
    };

    const handleChanges = (ev, index, key) => {
        const { name, value } = ev.target;

        const otherExpenses = productOthersExpenses.findIndex(oe => oe.other_expenses === index);
        const otherExpensesResume = productOthersExpensesResume.findIndex(oe => oe.other_expenses === index);

        if (name === "total_cost_demanded") {
            productOthersExpenses[otherExpenses].total_cost_demanded = Number(value);
            productOthersExpensesResume[otherExpensesResume].total_cost_demanded = Number(value);
        }
        checkValidNext();
    }

    const checkValidNext = () => {
        productOthersExpenses.map((_, index) => {
            const other = productOthersExpenses[index];

            if(other.total_cost_demanded === 0){
                setActiveNextOthersExpenses(true);
            }else{
                setActiveNextOthersExpenses(false);
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

                                <ListItemText id={labelId} primary={`${items[value].code} - ${items[value].name}`} />
                                {type ?
                                    <Fragment>
                                        <TextField
                                            defaultValue={0}
                                            onChange={(ev) => handleChanges(ev, items[value]._id, index)}
                                            margin="normal"
                                            required
                                            type="number"
                                            id="total_cost_demanded"
                                            label={"Costo total demandado"}
                                            name="total_cost_demanded"
                                            size="small"
                                            sx={{ width: "170px" }}
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
                <Grid item>{customList(true, 'Otros gastos escogidos', left)}</Grid>
            </Box>
            <Grid sx={{ padding: 1 }}>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={{ my: 0.5, fontWeight: "bold", fontSize: "20px", padding: 0.5 }}
                        variant="outlined"
                        size="medium"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5, fontWeight: "bold", fontSize: "20px", padding: 0.5 }}
                        variant="outlined"
                        size="medium"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Box sx={{ width: '35%' }}>
                <Grid item>{customList(false, 'Otros gastos actual', right)}</Grid>
            </Box>
        </Grid>
    )
}

FormOtherExpenses.propTypes = {
    mode: PropTypes.string,
    othersExpenses: PropTypes.array,
    productOthersExpenses: PropTypes.array,
    setProductOthersExpenses: PropTypes.func,
    productOthersExpensesResume: PropTypes.array,
    setProductOthersExpensesResume: PropTypes.func,
    setActiveNextOthersExpenses: PropTypes.func
};

export default FormOtherExpenses;