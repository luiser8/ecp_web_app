import { del, get, post, put } from '../helpers/Fetch';

export const getMaterialsSimple = async (token) => {
    return await get('material', token);
}

export const getMaterialExists = async (type, value, token) => {
    return await get(`material/check/type/${type}/value/${value}`, token);
}

export const getMaterialById = async (id, token) => {
    return await get(`material/${id}`, token);
}

export const postMaterial = async (payload, token) => {
    return await post('material', payload, token);
}

export const putMaterial = async (id, payload, token) => {
    return await put('material', id, payload, token);
}

export const deleteMaterial = async (id, token) => {
    return await del('material', id, token);
}
