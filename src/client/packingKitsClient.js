import { get } from '../helpers/Fetch';

export const getPackingKitSimple = async (token) => {
    return await get('packingkit', token);
}

export const getPackingKitAll = async (token) => {
    return await get('packingkit/all', token);
}
