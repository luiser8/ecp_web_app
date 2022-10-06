import { del, get, post, put } from '../helpers/Fetch';

export const getCategoriesSimple = async (token) => {
    return await get('category', token);
}

export const getCategoriesAll = async (token) => {
    return await get('category/all', token);
}

export const getCategoriesExists = async (type, value, token) => {
    return await get(`category/check/type/${type}/value/${value}`, token);
}

export const getCategoriesById = async (id, token) => {
    return await get(`category/${id}`, token);
}

export const getCategoriesByDad = async (dad, token) => {
    return await get(`category/dad/${dad}`, token);
}

export const postCategories = async (payload, token) => {
    return await post('category', payload, token);
}

export const putCategories = async (id, payload, token) => {
    return await put('category', id, payload, token);
}

export const deleteCategories = async (id, token) => {
    return await del('category', id, token);
}
