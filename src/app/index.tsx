import MainApp from '../features/main-app/main-app';
import { AuthorizationProvider } from './providers/AuthorizationProvider';

const Application = () => {
    return (
        <AuthorizationProvider>
            <MainApp />
        </AuthorizationProvider>
    );
};

export default Application;

