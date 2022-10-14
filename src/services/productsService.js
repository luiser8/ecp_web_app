import { getProductsSimple, getProductById, getProductExists, postProduct, deleteProduct } from '../client/productsClient';

export const getProductsSimpleService = async (userToken) => {
    let data = []; let error = "";
    (Promise.all([
        await getProductsSimple(userToken).then((values) => {
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

export const getProductByIdService = async (id, userToken) => {
    let data = {}; let error = "";
    (Promise.all([
        await getProductById(id, userToken).then((values) => {
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

export const getProductsExistsService = async (type, value, userToken) => {
    let data = false; let error = "";
    (Promise.all([
        await getProductExists(type, value, userToken).then((values) => {
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

export const postProductService = async (payload, userToken) => {
    let data = ""; let error = "";
    (Promise.all([
        await postProduct(payload, userToken).then((values) => {
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

export const deleteProductService = async (id, userToken) => {
    let data = ""; let error = "";
    (Promise.all([
        await deleteProduct(id, userToken).then((values) => {
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
