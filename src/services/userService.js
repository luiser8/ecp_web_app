import { post } from '../helpers/Fetch';

export const loginUser = async (username, password) => {
    return await post('users/login', { "username": username, "password": password });
} 
