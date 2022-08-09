import { get } from '../helpers/Fetch';

export const getCategoriesSimple = async (token) => {
    return await get('category', token);
}
