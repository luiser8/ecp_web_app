import { deleteMaterial, getMaterialById, getMaterialExists, getMaterialsSimple, getMaterialWithProduct, postMaterial, putMaterial } from '../client/materialsClient';

export const getMaterialsSimpleService = async (userToken) => {
    let data = []; let error = "";
    (Promise.all([
        await getMaterialsSimple(userToken).then((values) => {
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

export const getMaterialByIdService = async (id, userToken) => {
    let data = {}; let error = "";
    (Promise.all([
        await getMaterialById(id, userToken).then((values) => {
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

export const getMaterialWithProducts = async (id, userToken) => {
    let data = []; let error = "";
    (Promise.all([
        await getMaterialWithProduct(id, userToken).then((values) => {
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

export const getMaterialsExistsService = async (type, value, userToken) => {
    let data = false; let error = "";
    (Promise.all([
        await getMaterialExists(type, value, userToken).then((values) => {
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

export const postMaterialService = async (payload, userToken) => {
    let data = ""; let error = "";
    (Promise.all([
        await postMaterial(payload, userToken).then((values) => {
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

export const putMaterialService = async (id, payload, userToken) => {
    let data = ""; let error = "";
    (Promise.all([
        await putMaterial(id, payload, userToken).then((values) => {
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

export const deleteMaterialService = async (id, userToken) => {
    let data = ""; let error = "";
    (Promise.all([
        await deleteMaterial(id, userToken).then((values) => {
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
