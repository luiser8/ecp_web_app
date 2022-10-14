import { deleteCategories, getCategoriesAll, getCategoriesByDad, getCategoriesById, getCategoriesExists, getCategoriesSimple, postCategories, putCategories } from '../client/categoryClient';

export const getCategorySimpleService = async (userToken) => {
    let data = []; let error = "";
    (Promise.all([
        await getCategoriesSimple(userToken).then((values) => {
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

export const getCategoryAllService = async (userToken) => {
    let data = []; let error = "";
    (Promise.all([
        await getCategoriesAll(userToken).then((values) => {
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

export const getCategoriesByIdService = async (id, userToken) => {
    let data = {}; let error = "";
    (Promise.all([
        await getCategoriesById(id, userToken).then((values) => {
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

export const getCategoriesByDadService = async (dad, userToken) => {
    let data = []; let error = "";
    (Promise.all([
        await getCategoriesByDad(dad, userToken).then((values) => {
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

export const getCategoriesExistsService = async (type, value, userToken) => {
    let data = false; let error = "";
    (Promise.all([
        await getCategoriesExists(type, value, userToken).then((values) => {
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

export const postCategoriesService = async (payload, userToken) => {
    let data = ""; let error = "";
    (Promise.all([
        await postCategories(payload, userToken).then((values) => {
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

export const putCategoriesService = async (id, payload, userToken) => {
    let data = ""; let error = "";
    (Promise.all([
        await putCategories(id, payload, userToken).then((values) => {
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

export const deleteCategoriesService = async (id, userToken) => {
    let data = ""; let error = "";
    (Promise.all([
        await deleteCategories(id, userToken).then((values) => {
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
