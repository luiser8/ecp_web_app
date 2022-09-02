import { deletePackingKit, getPackingKitById, getPackingKitExists, getPackingKitSimple, getPackingKitWithProduct, postPackingKit, putPackingKit } from '../client/packingKitsClient';

export const getPackingKitSimpleService = async (userToken) => {
    let packingkit = [];
    (Promise.all([
        await getPackingKitSimple(userToken).then((values) => {
            if (values !== null) {
                packingkit = [...packingkit, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return packingkit;
}

export const getPackingKitByIdService = async (id, userToken) => {
    let packingKit = {};
    (Promise.all([
        await getPackingKitById(id, userToken).then((values) => {
            if (values !== null) {
                packingKit = {...packingKit, ...values !== undefined ? values : {}};
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return packingKit;
}

export const getPackingKitWithProducts = async (id, userToken) => {
    let packingKit = [];
    (Promise.all([
        await getPackingKitWithProduct(id, userToken).then((values) => {
            if (values !== null) {
                packingKit = [...packingKit, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return packingKit;
}

export const getPackingKitsExistsService = async (type, value, userToken) => {
    let packingKit = false;
    (Promise.all([
        await getPackingKitExists(type, value, userToken).then((values) => {
            if (values !== null) {
                packingKit = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return packingKit;
}

export const postPackingKitService = async (payload, userToken) => {
    let packingKit = "";
    (Promise.all([
        await postPackingKit(payload, userToken).then((values) => {
            if (values !== null) {
                packingKit = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return packingKit;
}

export const putPackingKitService = async (id, payload, userToken) => {
    let packingKit = "";
    (Promise.all([
        await putPackingKit(id, payload, userToken).then((values) => {
            if (values !== null) {
                packingKit = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return packingKit;
}

export const deletePackingKitService = async (id, userToken) => {
    let packingKit = "";
    (Promise.all([
        await deletePackingKit(id, userToken).then((values) => {
            if (values !== null) {
                packingKit = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return packingKit;
}
