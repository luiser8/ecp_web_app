import { deleteMaterial, getMaterialById, getMaterialExists, getMaterialsSimple, getMaterialWithProduct, postMaterial, putMaterial } from '../client/materialsClient';

export const getMaterialsSimpleService = async (userToken) => {
    let materials = [];
    (Promise.all([
        await getMaterialsSimple(userToken).then((values) => {
            if (values !== null) {
                materials = [...materials, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return materials;
}

export const getMaterialByIdService = async (id, userToken) => {
    let material = {};
    (Promise.all([
        await getMaterialById(id, userToken).then((values) => {
            if (values !== null) {
                material = {...material, ...values !== undefined ? values : {}};
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return material;
}

export const getMaterialWithProducts = async (id, userToken) => {
    let material = [];
    (Promise.all([
        await getMaterialWithProduct(id, userToken).then((values) => {
            if (values !== null) {
                material = [...material, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return material;
}

export const getMaterialsExistsService = async (type, value, userToken) => {
    let material = false;
    (Promise.all([
        await getMaterialExists(type, value, userToken).then((values) => {
            if (values !== null) {
                material = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return material;
}

export const postMaterialService = async (payload, userToken) => {
    let material = "";
    (Promise.all([
        await postMaterial(payload, userToken).then((values) => {
            if (values !== null) {
                material = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return material;
}

export const putMaterialService = async (id, payload, userToken) => {
    let material = "";
    (Promise.all([
        await putMaterial(id, payload, userToken).then((values) => {
            if (values !== null) {
                material = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return material;
}

export const deleteMaterialService = async (id, userToken) => {
    let material = "";
    (Promise.all([
        await deleteMaterial(id, userToken).then((values) => {
            if (values !== null) {
                material = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return material;
}
