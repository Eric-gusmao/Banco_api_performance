import http from 'k6/http'
const postlogin = JSON.parse(open('../fixtures/postlogin.json'))

export function obterToken() {
    const url = 'http://localhost:3000/login';

    console.log(postlogin)
    const payload = JSON.stringify(postlogin);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    return res.json('token')
}