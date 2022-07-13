import { get } from '../helpers/Fetch';

export const getProductsSimple = async (token) => {
    return await get('product', token);
} 
