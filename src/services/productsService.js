import { getProductsSimple, getProductById, getProductExists, postProduct, deleteProduct } from '../client/productsClient';

export const getProductsSimpleService = async (userToken) => {
    let products = [];
    (Promise.all([
        await getProductsSimple(userToken).then((values) => {
            if (values !== null) {
                products = [...products, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return products;
}

export const getProductByIdService = async (id, userToken) => {
    let product = {};
    (Promise.all([
        await getProductById(id, userToken).then((values) => {
            if (values !== null) {
                product = {...product, ...values !== undefined ? values : {}};
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return product;
}

export const getProductsExistsService = async (type, value, userToken) => {
    let product = false;
    (Promise.all([
        await getProductExists(type, value, userToken).then((values) => {
            if (values !== null) {
                product = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return product;
}

export const postProductService = async (payload, userToken) => {
    let product = "";
    (Promise.all([
        await postProduct(payload, userToken).then((values) => {
            if (values !== null) {
                product = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return product;
}

export const deleteProductService = async (id, userToken) => {
    let product = "";
    (Promise.all([
        await deleteProduct(id, userToken).then((values) => {
            if (values !== null) {
                product = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return product;
}
