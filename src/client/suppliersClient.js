import { get } from '../helpers/Fetch';

export const getSupplierSimple = async (token) => {
    return await get('supplier', token);
}
