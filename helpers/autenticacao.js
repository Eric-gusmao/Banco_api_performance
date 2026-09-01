import http from 'k6/http'
import { pegarBaseURL } from '../utils/varialve.js'
const postlogin = JSON.parse(open('../fixtures/postlogin.json'))

export function obterToken() {
    const url = pegarBaseURL() + '/login';

    const payload = JSON.stringify(postlogin);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    return res.json('token')
}