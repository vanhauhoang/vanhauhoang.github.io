import { userApi } from './user';

export const loginUser = async (userId: string) => {
    try {
        const res = await userApi.loginUser(userId);
        return res.data;
    } catch (err) {
        console.error(err);
    }
};

export const fetchUserById = async (userId: string) => {
    try {
        const res = await userApi.getUserInfoById(userId);

        if (res) {
            return res;
        }

        return null;
    } catch (err) {
        console.error(err);
    }
};

export const spinWheelByUser = async (userId: string, body: any) => {
    try {
        const res = await userApi.spinWheel(userId, body);
        return res;
    } catch (err) {
        console.error(err);
    }
};

export const buySpinsByUser = async (userId: string, body: any) => {
    try {
        const res = await userApi.buySpins(userId, body);
        return res;
    } catch (err) {
        console.error(err);
    }
};

export const referralUser = async (referredUserId: string, body: any) => {
    try {
        const res = await userApi.referral(referredUserId, body);
        return res.data;
    } catch (err) {
        console.error(err);
    }
};

