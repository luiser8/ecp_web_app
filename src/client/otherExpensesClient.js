import { del, get, post, put } from '../helpers/Fetch';

export const getOtherExpensesAll = async (token) => {
    return await get('otherexpenses', token);
}

export const getOtherExpensesExists = async (type, value, token) => {
    return await get(`otherexpenses/check/type/${type}/value/${value}`, token);
}

export const getOtherExpensesById = async (id, token) => {
    return await get(`otherexpenses/${id}`, token);
}

export const postOtherExpenses = async (payload, token) => {
    return await post('otherexpenses', payload, token);
}

export const putOtherExpenses = async (id, payload, token) => {
    return await put('otherexpenses', id, payload, token);
}

export const deleteOtherExpenses = async (id, token) => {
    return await del('otherexpenses', id, token);
}
