import backend from '../backend'
const request = (url, method = 'get', data = {}) => {
    var config = {
        method: method,
        url: `${backend}/${url}`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        data: data
    };
    return config
}

export default request