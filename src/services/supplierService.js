import { deleteSupplier, getSupplierAll, getSupplierById, getSupplierExists, getSupplierSimple, postSupplier, putSupplier } from '../client/suppliersClient';

export const getSuppliersSimpleService = async (userToken) => {
    let data = []; let error = "";
    (Promise.all([
        await getSupplierSimple(userToken).then((values) => {
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

export const getSuppliersAllService = async (userToken) => {
    let data = []; let error = "";
    (Promise.all([
        await getSupplierAll(userToken).then((values) => {
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

export const getSupplierByIdService = async (id, userToken) => {
    let data = {}; let error = "";
    (Promise.all([
        await getSupplierById(id, userToken).then((values) => {
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

export const getSuppliersExistsService = async (type, value, userToken) => {
    let data = false; let error = "";
    (Promise.all([
        await getSupplierExists(type, value, userToken).then((values) => {
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

export const postSupplierService = async (payload, userToken) => {
    let data = ""; let error = "";
    (Promise.all([
        await postSupplier(payload, userToken).then((values) => {
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

export const putSupplierService = async (id, payload, userToken) => {
    let data = ""; let error = "";
    (Promise.all([
        await putSupplier(id, payload, userToken).then((values) => {
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

export const deleteSupplierService = async (id, userToken) => {
    let data = ""; let error = "";
    (Promise.all([
        await deleteSupplier(id, userToken).then((values) => {
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
