export default config = {
    url: {
        production: true,
        dev: 'http://localhost:9010/api/v1/',
        prod: 'https://ecp-web-api.herokuapp.com/api/v1/'
    },
    headers: {
        production: true,
        dev: new Headers({ 'Content-Type': 'application/json;charset=UTF-8'}),
        prod: new Headers({ 'Content-Type': 'application/json;charset=UTF-8'})
    }
};
