import { get } from '../helpers/Fetch';

export const getMaterialsSimple = async (token) => {
    return await get('material', token);
}
