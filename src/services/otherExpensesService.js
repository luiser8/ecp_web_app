import { deleteOtherExpenses, getOtherExpensesAll, getOtherExpensesById, getOtherExpensesExists, postOtherExpenses, putOtherExpenses } from '../client/otherExpensesClient';

export const getOtherExpensesAllService = async (userToken) => {
    let otherExpenses = [];
    (Promise.all([
        await getOtherExpensesAll(userToken).then((values) => {
            if (values !== null) {
                otherExpenses = [...otherExpenses, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return otherExpenses;
}

export const getOtherExpensesByIdService = async (id, userToken) => {
    let otherExpenses = {};
    (Promise.all([
        await getOtherExpensesById(id, userToken).then((values) => {
            if (values !== null) {
                otherExpenses = {...otherExpenses, ...values !== undefined ? values : {}};
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return otherExpenses;
}

export const getOtherExpensesExistsService = async (type, value, userToken) => {
    let otherExpenses = false;
    (Promise.all([
        await getOtherExpensesExists(type, value, userToken).then((values) => {
            if (values !== null) {
                otherExpenses = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return otherExpenses;
}

export const postOtherExpensesService = async (payload, userToken) => {
    let otherExpenses = "";
    (Promise.all([
        await postOtherExpenses(payload, userToken).then((values) => {
            if (values !== null) {
                otherExpenses = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return otherExpenses;
}

export const putOtherExpensesService = async (id, payload, userToken) => {
    let otherExpenses = "";
    (Promise.all([
        await putOtherExpenses(id, payload, userToken).then((values) => {
            if (values !== null) {
                otherExpenses = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return otherExpenses;
}

export const deleteOtherExpensesService = async (id, userToken) => {
    let otherExpenses = "";
    (Promise.all([
        await deleteOtherExpenses(id, userToken).then((values) => {
            if (values !== null) {
                otherExpenses = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return otherExpenses;
}
