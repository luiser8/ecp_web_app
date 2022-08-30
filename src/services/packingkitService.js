import { getPackingKitSimple } from '../client/packingKitsClient';

export const getPackingKitSimpleService = async (userToken) => {
    let packingkit = [];
    (Promise.all([
        await getPackingKitSimple(userToken).then((values) => {
            if (values !== null) {
                packingkit = [...packingkit, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return packingkit;
}
