export default config = {
    url: {
        production: false,
        dev: 'http://localhost:9010/api/v1/',
        prod: 'http://localhost/api/v1/'
    },
    headers: {
        production: false,
        dev: new Headers({ 'Content-Type': 'application/json;charset=UTF-8'}),
        prod: ''
    }
};
