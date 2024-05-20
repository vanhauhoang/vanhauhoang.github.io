import { Instance } from '../api-config';

export const userApi = {
    getUserInfoById: (id: string) => Instance.get(`user/${id}`),
    spinWheel: (userId: string, body: any) => Instance.post(`spin/${userId}`, body),
    buySpins: (userId: string, body: any) => Instance.post(`buy/${userId}`, body),
    loginUser: (userId: string) => Instance.post(`login/${userId}`),
};

