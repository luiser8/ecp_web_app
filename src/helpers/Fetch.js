import PropTypes from 'prop-types';

const apiurl = import.meta.env.VITE_API_URL;
const headers = new Headers({ 'Content-Type': 'application/json'});
const blobHeader = new Headers({ 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

export const get = async (route) => {
    const url = `${apiurl}${route}`;
    return await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers,
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
export const post = async (route, data) => {
    const url = `${apiurl}${route}`;
    return await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers,
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
export const put = async (route, data) => {
    const url = `${apiurl}${route}`;
    return await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers,
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
export const del = async (route) => {
    const url = `${apiurl}${route}`;
    return await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
        headers,
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

export const blob = async (route) => {
    const url = `${apiurl}${route}`;
    return await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: blobHeader,
    }).then(response => {
        return response;
    }).catch(e => console.log(e));
}

get.propTypes = {
    route : PropTypes.string,
}
post.propTypes = {
    route : PropTypes.string,
    data : PropTypes.object,
}
put.propTypes = {
    route : PropTypes.string,
    data : PropTypes.object,
}
del.propTypes = {
    route : PropTypes.string,
}
blob.propTypes = {
    route : PropTypes.string,
}