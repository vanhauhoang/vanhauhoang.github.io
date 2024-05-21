import { FC, ReactElement } from 'react';
import { SpinTemplate } from '../spin-template/spin-template';
import { useAppContext } from '../../app/providers/AppContext';
import { ExtraSpins } from '../extra-spins/extra-spins';
import { Invitation } from '../invitation/invitation';
import { Footer } from '../footer/footer';

import styles from './main-app.module.scss';

const MainApp: FC = (): ReactElement => {
    const { userData, isMobile, isAvailableToSpin } = useAppContext();

    return (
        <div className={styles.app__wrapper}>
            <div className={styles.app__container}>
                <SpinTemplate
                    isUserLoggedIn={!!userData?.userId}
                    isAvailableToSpin={isAvailableToSpin}
                    isMobile={isMobile}
                />
                <ExtraSpins isMobile={isMobile} userData={userData} />
                <Invitation userData={userData} isMobile={isMobile} />
                {/* <button
                    onClick={() => {
                        //@ts-ignore
                        return window.Telegram.WebApp.showPopup({
                            title: 'Contacts',
                            message: 'This feature is not yet implemented.',
                            buttons: [{ text: 'OK', type: 'close' }],
                        });
                    }}
                >
                    Show Contacts
                </button> */}
                <Footer isMobile={isMobile} unclaimedTokens={userData?.unclaimedTokens} />
            </div>
        </div>
    );
};

export default MainApp;

