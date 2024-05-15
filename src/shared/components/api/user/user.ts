import { Instance } from '../api-config';

export const userApi = {
    getUserInfoById: (id = '1') => Instance.get(`user/${id}`),
};

