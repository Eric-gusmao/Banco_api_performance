import http from 'k6/http'
import { sleep, check } from 'k6'
const postlogin = JSON.parse(open('../fixtures/postlogin.json'))

export const options = {
    stages: [
        {duration: '10s', target: 10},
        {duration: '20s', target: 10},
        {duration: '10s', target: 30},
        {duration: '20s', target: 30},
        {duration: '20s', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(90)<3000', 'max<5000'],
        http_req_failed: ['rate<0.01']
    }
}

export default function () {
    const url = pegarBaseURL() + '/login';

    postlogin.username = "junior.lima"
    console.log(postlogin)
    const payload = JSON.stringify(postlogin);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'Validade que Status é 200': (r) => r.status === 200,
        'Validar que Token é string': (r) => typeof(r.json().token) == 'string'
    })

    sleep(1);
}