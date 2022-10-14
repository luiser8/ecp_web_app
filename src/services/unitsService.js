import { getUnitsSimple } from '../client/unitsClient';

export const getUnitsSimpleService = async (userToken) => {
    let data = []; let error = "";
    (Promise.all([
        await getUnitsSimple(userToken).then((values) => {
            if (values === "Invalid Token") {
                error = values;
                return;
            }
            if (values !== null) {
                data = [...data, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return { data, error };
}
