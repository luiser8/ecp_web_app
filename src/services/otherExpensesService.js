import { deleteOtherExpenses, getOtherExpensesAll, getOtherExpensesById, getOtherExpensesExists, postOtherExpenses, putOtherExpenses } from '../client/otherExpensesClient';

export const getOtherExpensesAllService = async (userToken) => {
    let data = []; let error = "";
    (Promise.all([
        await getOtherExpensesAll(userToken).then((values) => {
            if (values === "Invalid Token") {
                error = values;
                return;
            }
            if (values !== null) {
                data = [...data, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return { data, error };
}

export const getOtherExpensesByIdService = async (id, userToken) => {
    let data = {}; let error = "";
    (Promise.all([
        await getOtherExpensesById(id, userToken).then((values) => {
            if (values === "Invalid Token") {
                error = values;
                return;
            }
            if (values !== null) {
                data = {...data, ...values !== undefined ? values : {}};
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return { data, error };
}

export const getOtherExpensesExistsService = async (type, value, userToken) => {
    let data = false; let error = "";
    (Promise.all([
        await getOtherExpensesExists(type, value, userToken).then((values) => {
            if (values === "Invalid Token") {
                error = values;
                return;
            }
            if (values !== null) {
                data = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return { data, error };
}

export const postOtherExpensesService = async (payload, userToken) => {
    let data = ""; let error = "";
    (Promise.all([
        await postOtherExpenses(payload, userToken).then((values) => {
            if (values === "Invalid Token") {
                error = values;
                return;
            }
            if (values !== null) {
                data = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return { data, error };
}

export const putOtherExpensesService = async (id, payload, userToken) => {
    let data = ""; let error = "";
    (Promise.all([
        await putOtherExpenses(id, payload, userToken).then((values) => {
            if (values === "Invalid Token") {
                error = values;
                return;
            }
            if (values !== null) {
                data = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return { data, error };
}

export const deleteOtherExpensesService = async (id, userToken) => {
    let data = ""; let error = "";
    (Promise.all([
        await deleteOtherExpenses(id, userToken).then((values) => {
            if (values === "Invalid Token") {
                error = values;
                return;
            }
            if (values !== null) {
                data = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return { data, error };
}
