import { AuthorizationProvider } from '../../app/providers/AuthorizationProvider';
import MainApp from '../../features/main-app/main-app';

const Main = () => {
    return (
        <AuthorizationProvider>
            <MainApp />
        </AuthorizationProvider>
    );
};

export default Main;
