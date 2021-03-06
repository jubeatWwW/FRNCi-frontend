import qs from 'qs';
import alertify from 'alertifyjs';
import { API_URL } from '../../config';

function parsePath(path, params) {
    if (!params) return path;
    return Object.keys(params).reduce((resolvedPath, key) => {
        const value = params[key];
        return resolvedPath.replace(`:${key}`, value);
    }, path);
}

export default (path = '', method = 'GET', requireAuth = false, showAlert = true) => async (args = {}) => {
    const { body, params, query, headers: otherHeaders, alertMsg } = args;
    let headers = { 'Content-Type': 'application/json' };
    if (requireAuth) {
        const token = localStorage.getItem('_token');
        if (token) {
            headers.Authorization = token;
        } else {
            return {
                ok: false,
                error: {
                    message: 'Need login',
                },
            };
        }
    }

    if (otherHeaders) {
        headers = { ...headers, ...otherHeaders };
    }

    const options = {
        method,
        mode: 'cors',
        headers: new Headers(headers),
    };

    let parsedPath = parsePath(path, params);

    if (query) {
        parsedPath += `?${qs.stringify(query)}`;
    }

    if (body && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(body);
    }

    try {
        const res = await fetch(`${API_URL}/${parsedPath}`, options);
        if (res.ok) {
            const isTextResponse = res.headers.get('Content-Type').indexOf('text') >= 0;
            const responseData = await (isTextResponse ? res.text() : res.json());
            return responseData instanceof Array ? {
                ok: true,
                data: responseData,
            } : {
                ok: true,
                ...responseData,
            };
        }
        const errorData = await res.json();
        const err = {
            response: res,
            error: errorData,
        };
        throw err;
    } catch (err) {
        console.error(err);
        if (alertMsg) {
            alertify.alert('Error', alertMsg);
        }

        if (err.error && err.error.message && err.error.message !== 'Error') {
            if (showAlert) {
                alertify.alert('Error', err.error.message);
            }
        }
        return err;
    }
};
