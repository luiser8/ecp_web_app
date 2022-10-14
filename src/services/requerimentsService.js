import { getAllRequeriments } from '../client/requerimentsClient';

export const getAllRequerimentsService = async (userToken) => {
    let data = []; let error = "";
    (Promise.all([
        await getAllRequeriments(userToken).then((values) => {
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
