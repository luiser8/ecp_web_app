import { get } from '../helpers/Fetch';

export const getUnitsSimple = async (token) => {
    return await get('unit', token);
}
