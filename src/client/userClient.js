import { post } from '../helpers/Fetch';

export const loginUser = async (username, password) => {
    return await post('users/login', { "username": username, "password": password });
}

export const loginRefreshUser = async (refreshtoken) => {
    return await post('users/loginrefresh', { "refreshtoken": refreshtoken });
}
