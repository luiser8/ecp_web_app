import { get, post } from '../helpers/Fetch';

export const getProductsSimple = async (token) => {
    return await get('product', token);
} 

export const getProductCodeExists = async (code, token) => {
    return await get(`product/check/${code}`, token);
} 

export const getProductById = async (id, token) => {
    return await get(`product/${id}`, token);
}

export const postProduct = async (payload, token) => {
    return await post('product', payload, token);
}
