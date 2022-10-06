import { deleteCategories, getCategoriesAll, getCategoriesByDad, getCategoriesById, getCategoriesExists, getCategoriesSimple, postCategories, putCategories } from '../client/categoryClient';

export const getCategorySimpleService = async (userToken) => {
    let categories = [];
    (Promise.all([
        await getCategoriesSimple(userToken).then((values) => {
            if (values !== null) {
                categories = [...categories, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return categories;
}

export const getCategoryAllService = async (userToken) => {
    let categories = [];
    (Promise.all([
        await getCategoriesAll(userToken).then((values) => {
            if (values !== null) {
                categories = [...categories, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return categories;
}

export const getCategoriesByIdService = async (id, userToken) => {
    let category = {};
    (Promise.all([
        await getCategoriesById(id, userToken).then((values) => {
            if (values !== null) {
                category = {...category, ...values !== undefined ? values : {}};
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return category;
}

export const getCategoriesByDadService = async (dad, userToken) => {
    let categories = [];
    (Promise.all([
        await getCategoriesByDad(dad, userToken).then((values) => {
            if (values !== null) {
                categories = [...categories, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return categories;
}

export const getCategoriesExistsService = async (type, value, userToken) => {
    let category = false;
    (Promise.all([
        await getCategoriesExists(type, value, userToken).then((values) => {
            if (values !== null) {
                category = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return category;
}

export const postCategoriesService = async (payload, userToken) => {
    let categories = "";
    (Promise.all([
        await postCategories(payload, userToken).then((values) => {
            if (values !== null) {
                categories = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return categories;
}

export const putCategoriesService = async (id, payload, userToken) => {
    let category = "";
    (Promise.all([
        await putCategories(id, payload, userToken).then((values) => {
            if (values !== null) {
                category = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return category;
}

export const deleteCategoriesService = async (id, userToken) => {
    let category = "";
    (Promise.all([
        await deleteCategories(id, userToken).then((values) => {
            if (values !== null) {
                category = values;
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return category;
}
