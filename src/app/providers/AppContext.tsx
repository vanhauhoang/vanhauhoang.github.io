import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import LoaderScreen from '../../features/loader-screen/LoaderScreen';
import { fetchUserById } from '../../shared/components/api/user/thunks';

// Define the shape of the user data
interface UserData {
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
    userData: UserData;
    updateFreeSpins: () => void;
    updateBonusSpins: () => void;
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

    useEffect(() => {
        fetchUserById('1').then((res) => setUserData(res?.data));
        setTimeout(() => setIsLoading(false), 4000);
    }, []);

    if (loading || !userData) {
        return <LoaderScreen />;
    }

    const updateTempWinScore = (score: number) => {
        setTimeout(() => {
            setUserData((prevUserData: any) => ({
                ...prevUserData,
                unclaimedTokens: prevUserData.unclaimedTokens + score,
            }));
        }, 7_000);
    };

    const updateFreeSpins = () => {
        if (userData) {
            setUserData((prevUserData: any) => ({
                ...prevUserData,
                spinsAvailable: prevUserData.spinsAvailable > 0 ? prevUserData.spinsAvailable - 1 : 0,
            }));
        }
    };

    const updateBonusSpins = () => {
        setUserData((prevUserData: any) => ({
            ...prevUserData,
            bonusSpins: prevUserData.bonusSpins + 1,
        }));
    };

    return (
        <AppContext.Provider value={{ userData, updateTempWinScore, updateFreeSpins, updateBonusSpins }}>
            {children}
        </AppContext.Provider>
    );
};

