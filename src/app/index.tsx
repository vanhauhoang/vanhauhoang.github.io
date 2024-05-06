import { Typography } from '../shared/components/typography';
import { AuthorizationProvider } from './providers/AuthorizationProvider';

const Application = () => {
    return (
        <AuthorizationProvider>
            <Typography fontFamily="Roundy Rainbows, sans-serif">Entire App</Typography>
        </AuthorizationProvider>
    );
};

export default Application;

