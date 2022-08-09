import { getUnitsSimple } from '../client/unitsClient';

export const getUnitsSimpleService = async (userToken) => {
    let units = [];
    (Promise.all([
        await getUnitsSimple(userToken).then((values) => {
            if (values !== null) {
                units = [...units, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return units;
}
