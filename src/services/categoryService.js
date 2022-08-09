import { getCategoriesSimple } from '../client/categoryClient';

export const getCategorySimpleService = async (userToken) => {
    let category = [];
    (Promise.all([
        await getCategoriesSimple(userToken).then((values) => {
            if (values !== null) {
                category = [...category, ...values !== undefined ? values : []];
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return category;
}
