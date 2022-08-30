import { loginUser } from "../client/userClient";

export const loginUserService = async (username, password) => {
    let user = {};
    (Promise.all([
        await loginUser(username, password).then((values) => {
            if (values !== null) {
                user = {...user, ...values !== undefined ? values : {}};
            }
        }),
    ]).catch(error => {
        new Error(error);
    }));
    return user;
}
