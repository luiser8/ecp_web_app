import { getAllRequeriments } from '../client/requerimentsClient';

export const getAllRequerimentsService = async (userToken) => {
    let requirements = [];
    (Promise.all([
        await getAllRequeriments(userToken).then((values) => {
            if (values !== null) {
                requirements = [...requirements, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return requirements;
}
