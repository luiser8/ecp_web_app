import PropTypes from 'prop-types';

const apiurl = import.meta.env.VITE_API_URL;

export const get = async (route, token) => {
    const url = `${apiurl}${route}`;
    return await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({ 'Content-Type': 'application/json', 'x-access-token': token}),
        json: true
    }).then(response => {
        if (response.status >= 200 && response.status <= 299) {
            return response.json()
        }else {
            response.json().then((json) => {
                return json;
            });
            return null
        }
    }).catch(e => console.log(e));
}
export const post = async (route, data, token) => {
    const url = `${apiurl}${route}`;
    return await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: new Headers({ 'Content-Type': 'application/json', 'x-access-token': token}),
        body: JSON.stringify(data),
        json: true
    }).then(response => {
        if (response.status >= 200 && response.status <= 299) {
            return response.json()
        }else {
            response.json().then((json) => {
                return json;
            });
            return null
        }
    }).catch(e => console.log(e));
}
export const put = async (route, id, data, token) => {
    const url = `${apiurl}${route}/${id}`;
    return await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: new Headers({ 'Content-Type': 'application/json', 'x-access-token': token}),
        body: JSON.stringify(data),
        json: true
    }).then(response => {
        if (response.status >= 200 && response.status <= 299) {
            return response.json()
        }else {
            response.json().then((json) => {
                return json;
            });
            return null
        }
    }).catch(e => console.log(e));
}
export const del = async (route, id, token) => {
    const url = `${apiurl}${route}/${id}`;
    return await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        headers: new Headers({ 'Content-Type': 'application/json', 'x-access-token': token}),
        json: true
    }).then(response => {
        if (response.status >= 200 && response.status <= 299) {
            return response.json()
        }else {
            response.json().then((json) => {
                return json;
            });
            return null
        }
    }).catch(e => console.log(e));
}

export const blob = async (route, token) => {
    const url = `${apiurl}${route}`;
    return await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({ 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'x-access-token': token}),
    }).then(response => {
        return response;
    }).catch(e => console.log(e));
}

get.propTypes = {
    route : PropTypes.string,
    token: PropTypes.string
}
post.propTypes = {
    route : PropTypes.string,
    token: PropTypes.string,
    data : PropTypes.object
}
put.propTypes = {
    route : PropTypes.string,
    token: PropTypes.string,
    data : PropTypes.object
}
del.propTypes = {
    route : PropTypes.string,
    token: PropTypes.string
}
blob.propTypes = {
    route : PropTypes.string,
    token: PropTypes.string
}