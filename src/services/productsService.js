import { get, post } from '../helpers/Fetch';

export const getProductsSimple = async (token) => {
    return await get('product', token);
} 

export const postProduct = async (payload, token) => {
    return await post('product', payload, token);
}
