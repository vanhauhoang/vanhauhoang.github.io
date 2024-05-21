import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import LoaderScreen from '../../features/loader-screen/LoaderScreen';
import { loginUser, referralUser, spinWheelByUser } from '../../shared/api/user/thunks';
import { useMediaQuery } from 'react-responsive';
import { GetCookie, removeAllCookies, SetCookie } from '../../shared/libs/cookies';
import { parseUriParamsLine } from '../../shared/utils/parseUriParams';

//@ts-ignore
const tg: any = window?.Telegram?.WebApp;

// Define the shape of the user data
export interface UserData {
    bonusSpins: number;
    createdAt: string;
    referralCode: string;
    referredBy: null | any;
    referredUsers: any[];
    spinsAvailable: number;
    unclaimedTokens: number;
    updatedAt: string;
    userId: string;
    __v: string;
    _id: string;
}

export interface TelegramUserData {
    allows_write_to_pm: boolean;
    first_name: string;
    id: number;
    is_premium: boolean;
    language_code: string;
    last_name: string;
    username: string;
}

// Define the shape of the context
interface AppContextType {
    userData: UserData | null;
    isFreeSpins: boolean | null;
    isMobile: boolean;
    isAvailableToSpin: boolean;
    tgUser: TelegramUserData | null;
    updateFreeSpins: () => void;
    updateBonusSpins: (countSpins?: number) => void;
    updateTempWinScore: (score: number) => void;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom hook to use the context
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
};

export const AppContextProvider: React.FC<{ children: ReactElement | ReactElement[] }> = ({ children }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
    const [tgUser, setTgUser] = useState<TelegramUserData | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setIsLoading] = useState<boolean>(true);
    const [isFreeSpins, setIsFreeSpins] = useState<boolean | null>(false);
    const [isAvailableToSpin, setIsAvailableToSpin] = useState<boolean>(false);
    const isAppLoaded = GetCookie('app_loaded');
    const uriParams = parseUriParamsLine(window.location.href?.split('?')?.[1]);

    useEffect(() => {
        return () => {
            onExitFromApp();
        };
    }, []);

    useEffect(() => {
        //@ts-ignore
        if (window.Telegram && window.Telegram.WebApp) {
            //@ts-ignore
            tg.ready();
            // Get user data from the Telegram Web App context
            const user = tg.initDataUnsafe.user;
            setTgUser(user);
        } else {
            console.error('Telegram WebApp is not initialized or running outside of Telegram context.');
        }
    }, []);

    useEffect(() => {
        loginUser(tgUser?.id?.toString() || '574813379')
            .then((res) => {
                if (res) {
                    setUserData(res.user);
                    if (uriParams?.startapp) return res.user;
                }
            })
            .then((res) => {
                if (res) {
                    referralUser(res?.userId, { referredById: uriParams?.startapp });
                }

                return;
            });
    }, [tgUser?.id, uriParams?.startapp]);

    useEffect(() => {
        //@ts-ignore
        if (userData?.bonusSpins > 0) {
            setIsFreeSpins(false);
            setIsAvailableToSpin(true);
            //@ts-ignore
        } else if (userData?.spinsAvailable > 0) {
            setIsFreeSpins(true);
            setIsAvailableToSpin(true);
        } else {
            setIsFreeSpins(null);
            setIsAvailableToSpin(false);
        }

        setTimeout(() => {
            setIsLoading(false);
            SetCookie('app_loaded', 'true');
        }, 4000);
    }, [userData?.spinsAvailable, userData?.bonusSpins]);

    //@ts-ignore
    if (!window.Telegram) {
        return <p>You are not in telegram enviroment</p>;
    }

    if (loading && !isAppLoaded && tg?.Telegram) {
        return <LoaderScreen />;
    }

    const updateTempWinScore = (score: number) => {
        if (userData?.userId) {
            spinWheelByUser(userData?.userId, {
                winScore: score,
                isFreeSpin: isFreeSpins,
            }).then((res) => {
                if (res && res.status && res?.status === 200) {
                    setTimeout(() => {
                        setUserData((prevUserData: any) => ({
                            ...prevUserData,
                            unclaimedTokens: prevUserData.unclaimedTokens + score,
                        }));
                    }, 7_000);
                }
            });
        }
    };

    const updateFreeSpins = () => {
        if (userData) {
            setUserData((prevUserData: any) => ({
                ...prevUserData,
                spinsAvailable: prevUserData.spinsAvailable > 0 ? prevUserData.spinsAvailable - 1 : 0,
            }));
        }
    };

    const updateBonusSpins = (countSpins?: number) => {
        if (countSpins) {
            setUserData((prevUserData: any) => ({
                ...prevUserData,
                bonusSpins: (prevUserData.bonusSpins += countSpins),
            }));
        } else {
            setUserData((prevUserData: any) => ({
                ...prevUserData,
                bonusSpins: prevUserData.bonusSpins - 1,
            }));
        }
    };

    function onExitFromApp() {
        removeAllCookies();
        tg.close();
    }

    return (
        <AppContext.Provider
            value={{
                tgUser,
                userData,
                isFreeSpins,
                isAvailableToSpin,
                isMobile,
                updateTempWinScore,
                updateFreeSpins,
                updateBonusSpins,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

