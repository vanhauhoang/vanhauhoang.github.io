import { FC, ReactElement, useEffect, useState } from 'react';
import LoaderScreen from '../../features/loader-screen/LoaderScreen';

interface Props {
    children: ReactElement[] | ReactElement;
}

export const AuthorizationProvider: FC<Props> = ({ children }): ReactElement[] | ReactElement => {
    const [loading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // setTimeout(() => setIsLoading(false), 5000);
    }, []);

    if (loading) {
        return <LoaderScreen />;
    }

    //Additional logic for authorization

    return children;
};

