import {apiLink, headers} from './constants'

export async function api(name, params = {}, formData = false) {
    const debug = true
    const apiHeaders = await headers(formData)
    return fetch(apiLink + name,
        {
            method: "POST",
            body: formData ? params : JSON.stringify(params),
            headers: apiHeaders
        })
        .then(res => {
            if (debug) console.log({res, params})
            return res.json();
        })
}

export function empty(value) {
    return (value === undefined || value === null || value === 0 || value === '' || value === false)
}