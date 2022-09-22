import { get } from '../helpers/Fetch';

export const getAllRequeriments = async (token) => {
    return await get('requirements', token);
}
