const requestObjectMaker = (method, includeBody, payload, headers, params, url) => {
    const object = {
        method: method,
        url: `${url}${params ? `/${params}` : ''}`,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',   
    }
    if(includeBody) {
        const bodyObj = {...payload};
        object.body = bodyObj
    }
    if (headers) {
        object.headers = headers
    }
    return object
}
module.exports = {
    requestObjectMaker
}