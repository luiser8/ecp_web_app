import { getSupplierSimple } from '../client/suppliersClient';

export const getSuppliersSimpleService = async (userToken) => {
    let suppliers = [];
    (Promise.all([
        await getSupplierSimple(userToken).then((values) => {
            if (values !== null) {
                suppliers = [...suppliers, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return suppliers;
}
