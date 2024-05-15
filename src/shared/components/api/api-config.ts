import axios from 'axios';

const hostBackendUrl = 'https://whiskers-be-20f5dcb585e5.herokuapp.com/';

export const Instance = axios.create({
    baseURL: hostBackendUrl,
    headers: {
        Accept: 'application/json',
        ['Content-Type']: 'application/json',
    },
});

