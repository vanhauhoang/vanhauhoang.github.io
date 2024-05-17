import { Instance } from '../api-config';

export const userApi = {
    getUserInfoById: (id = '1') => Instance.get(`user/${id}`),
    spinWheel: (userId: string, body: any) => Instance.post(`spin/${userId}`, body),
    buySpins: (userId: string, body: any) => Instance.post(`buy/${userId}`, body),
};

