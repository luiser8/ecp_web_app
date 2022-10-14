const Storage = () => {

    const getLocalStorage = () => {
        return {
            'userId': window.localStorage.getItem('userId'),
            'firstname': window.localStorage.getItem('firstname'),
            'lastname': window.localStorage.getItem('lastname'),
            'rolname': window.localStorage.getItem('rolname'),
            'accesstoken': window.localStorage.getItem('accesstoken'),
            'refreshtoken': window.localStorage.getItem('refreshtoken'),
        };
    }

    const setLocalStorage = (type, data) => {
        if (type === 1) {
           if (data !== null) {
                window.localStorage.setItem('userId', data.userId);
                window.localStorage.setItem('firstname', data.firstname);
                window.localStorage.setItem('lastname', data.lastname);
                window.localStorage.setItem('rolname', data.rolname);
                window.localStorage.setItem('accesstoken', data.accesstoken);
                window.localStorage.setItem('refreshtoken', data.refreshtoken);
            }
        } else if (type === 2) {
            window.localStorage.setItem('accesstoken', data.accesstoken);
        } else if (type === 3) {
            window.localStorage.removeItem('userId');
            window.localStorage.removeItem('firstname');
            window.localStorage.removeItem('lastname');
            window.localStorage.removeItem('rolname');
            window.localStorage.removeItem('accesstoken');
            window.localStorage.removeItem('refreshtoken');
        }
    }

    return {
        getLocalStorage, setLocalStorage
    }
}

export default Storage;
