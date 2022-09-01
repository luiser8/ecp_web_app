import { deleteSupplier, getSupplierAll, getSupplierById, getSupplierExists, getSupplierSimple, postSupplier, putSupplier } from '../client/suppliersClient';

export const getSuppliersSimpleService = async (userToken) => {
    let suppliers = [];
    (Promise.all([
        await getSupplierSimple(userToken).then((values) => {
            if (values !== null) {
                suppliers = [...suppliers, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return suppliers;
}

export const getSuppliersAllService = async (userToken) => {
    let suppliers = [];
    (Promise.all([
        await getSupplierAll(userToken).then((values) => {
            if (values !== null) {
                suppliers = [...suppliers, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return suppliers;
}

export const getSupplierByIdService = async (id, userToken) => {
    let supplier = {};
    (Promise.all([
        await getSupplierById(id, userToken).then((values) => {
            if (values !== null) {
                supplier = {...supplier, ...values !== undefined ? values : {}};
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return supplier;
}

export const getSuppliersExistsService = async (type, value, userToken) => {
    let supplier = false;
    (Promise.all([
        await getSupplierExists(type, value, userToken).then((values) => {
            if (values !== null) {
                supplier = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return supplier;
}

export const postSupplierService = async (payload, userToken) => {
    let supplier = "";
    (Promise.all([
        await postSupplier(payload, userToken).then((values) => {
            if (values !== null) {
                supplier = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return supplier;
}

export const putSupplierService = async (id, payload, userToken) => {
    let supplier = "";
    (Promise.all([
        await putSupplier(id, payload, userToken).then((values) => {
            if (values !== null) {
                supplier = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return supplier;
}

export const deleteSupplierService = async (id, userToken) => {
    let supplier = "";
    (Promise.all([
        await deleteSupplier(id, userToken).then((values) => {
            if (values !== null) {
                supplier = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return supplier;
}
