import axios from 'axios';

const hostBackendUrl = 'https://whiskers-be-20f5dcb585e5.herokuapp.com/';
const localBackendUrl = 'http://localhost:3000/';

export const Instance = axios.create({
    baseURL: localBackendUrl,
    headers: {
        Accept: 'application/json',
        ['Content-Type']: 'application/json',
    },
});

