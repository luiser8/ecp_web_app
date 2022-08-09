import { get } from '../helpers/Fetch';

export const getPackingKitAll = async (token) => {
    return await get('packingkit', token);
}
