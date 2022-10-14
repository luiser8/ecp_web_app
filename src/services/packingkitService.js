import { deletePackingKit, getPackingKitById, getPackingKitExists, getPackingKitSimple, getPackingKitWithProduct, postPackingKit, putPackingKit } from '../client/packingKitsClient';

export const getPackingKitSimpleService = async (userToken) => {
    let data = []; let error = "";
    (Promise.all([
        await getPackingKitSimple(userToken).then((values) => {
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

export const getPackingKitByIdService = async (id, userToken) => {
    let data = {}; let error = "";
    (Promise.all([
        await getPackingKitById(id, userToken).then((values) => {
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

export const getPackingKitWithProducts = async (id, userToken) => {
    let data = []; let error = "";
    (Promise.all([
        await getPackingKitWithProduct(id, userToken).then((values) => {
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

export const getPackingKitsExistsService = async (type, value, userToken) => {
    let data = false; let error = "";
    (Promise.all([
        await getPackingKitExists(type, value, userToken).then((values) => {
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

export const postPackingKitService = async (payload, userToken) => {
    let data = ""; let error = "";
    (Promise.all([
        await postPackingKit(payload, userToken).then((values) => {
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

export const putPackingKitService = async (id, payload, userToken) => {
    let data = ""; let error = "";
    (Promise.all([
        await putPackingKit(id, payload, userToken).then((values) => {
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

export const deletePackingKitService = async (id, userToken) => {
    let data = ""; let error = "";
    (Promise.all([
        await deletePackingKit(id, userToken).then((values) => {
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
