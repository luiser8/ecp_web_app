import { get, post, put, del } from '../helpers/Fetch';

export const getPackingKitSimple = async (token) => {
    return await get('packingkit', token);
}

export const getPackingKitAll = async (token) => {
    return await get('packingkit/all', token);
}

export const getPackingKitExists = async (type, value, token) => {
    return await get(`packingkit/check/type/${type}/value/${value}`, token);
}

export const getPackingKitById = async (id, token) => {
    return await get(`packingkit/${id}`, token);
}

export const getPackingKitWithProduct = async (material, token) => {
    return await get(`packingkit/products/${material}`, token);
}

export const postPackingKit = async (payload, token) => {
    return await post('packingkit', payload, token);
}

export const putPackingKit = async (id, payload, token) => {
    return await put('packingkit', id, payload, token);
}

export const deletePackingKit = async (id, token) => {
    return await del('packingkit', id, token);
}
