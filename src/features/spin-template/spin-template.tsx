import { Heading } from '../../shared/components/heading';
import { Logo } from '../../shared/components/logo';
import { useMediaQuery } from 'react-responsive';
import { WheelMobile } from '../../entities/wheel/wheel-mobile';
import { WheelDesktop } from '../../entities/wheel/wheel-desktop';

import styles from './spin-template.module.scss';

export const SpinTemplate = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
    return (
        <div className={styles.app__spin}>
            <div className={styles.app__title_and_logo}>
                <Logo fontSize={isMobile ? '32px' : '70px'} />
                <span className={styles.app__title}>
                    <Heading className={styles.app__heading} level="h1">
                        Spin&Earn
                    </Heading>
                </span>
            </div>
            {isMobile ? <WheelMobile /> : <WheelDesktop />}
        </div>
    );
};

