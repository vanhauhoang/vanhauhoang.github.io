import axios from 'axios';

//@ts-ignore
const hostBackendUrl = 'https://whisk-bot-be-b1887383233e.herokuapp.com/spin-and-earn/';
//@ts-ignore
const localBackendUrl = 'http://localhost:4000/spin-and-earn/';

export const Instance = axios.create({
    baseURL: hostBackendUrl,
    // baseURL: localBackendUrl,
    headers: {
        Accept: 'application/json',
        ['Content-Type']: 'application/json',
    },
});

