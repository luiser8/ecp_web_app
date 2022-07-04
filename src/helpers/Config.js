module.exports = global.config = {
    url: {
        production: false,
        dev: 'http://192.168.1.60/api/', 
        prod: 'http://10.0.0.2/api/'
    },
    headers: {
        production: false,
        dev: new Headers({ 'Content-Type': 'application/json;charset=UTF-8'}),
        prod: ''
    }
};
