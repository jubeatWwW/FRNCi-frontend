import { API_URL } from '../../config';

export default {

    loadProducts(nationality) {
        const n = `${nationality || 'tw'}`.toLowerCase();
        const tags = n === 'tw' ? ['201803', 'tw_only'] : ['201803', 'fn_only'];
        return fetch(`${API_URL}/products?tags=${tags}`, {
            mode: 'cors',
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw res;
        });
    },

    createOrder(productId, meta, token) {
        return fetch(`${API_URL}/orders`, {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({
                meta,
                products: {
                    [productId]: 1,
                },
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: token,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw res;
        });
    },

    checkoutOrder(orderId, token) {
        return fetch(`${API_URL}/orders/${orderId}/checkout`, {
            mode: 'cors',
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'text/html',
                Authorization: token,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.text();
            }
            throw res;
        });
    },
};
