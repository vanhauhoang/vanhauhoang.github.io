import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import LoaderScreen from '../../features/loader-screen/LoaderScreen';
import { fetchUserById, spinWheelByUser } from '../../shared/components/api/user/thunks';

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

// Define the shape of the context
interface AppContextType {
    userData: UserData | null;
    isFreeSpins: boolean | null;
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
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setIsLoading] = useState<boolean>(true);
    const [isFreeSpins, setIsFreeSpins] = useState<boolean | null>(false);

    console.log('isFreeSpins', isFreeSpins);

    useEffect(() => {
        //@ts-ignore
        if (userData?.bonusSpins > 0) {
            setIsFreeSpins(false);
            //@ts-ignore
        } else if (userData?.spinsAvailable > 0) {
            setIsFreeSpins(true);
        } else {
            setIsFreeSpins(null);
        }
    }, [userData]);

    useEffect(() => {
        fetchUserById('1').then((res) => setUserData(res?.data));
        setTimeout(() => setIsLoading(false), 4000);
    }, []);

    if (loading) {
        return <LoaderScreen />;
    }

    const updateTempWinScore = (score: number) => {
        spinWheelByUser('1', {
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

    return (
        <AppContext.Provider value={{ userData, isFreeSpins, updateTempWinScore, updateFreeSpins, updateBonusSpins }}>
            {children}
        </AppContext.Provider>
    );
};

