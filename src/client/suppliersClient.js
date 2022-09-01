import { del, get, post, put } from '../helpers/Fetch';

export const getSupplierSimple = async (token) => {
    return await get('supplier', token);
}

export const getSupplierAll = async (token) => {
    return await get('supplier/all', token);
}

export const getSupplierExists = async (type, value, token) => {
    return await get(`supplier/check/type/${type}/value/${value}`, token);
}

export const getSupplierById = async (id, token) => {
    return await get(`supplier/${id}`, token);
}

export const postSupplier = async (payload, token) => {
    return await post('supplier', payload, token);
}

export const putSupplier = async (id, payload, token) => {
    return await put('supplier', id, payload, token);
}

export const deleteSupplier = async (id, token) => {
    return await del('supplier', id, token);
}
