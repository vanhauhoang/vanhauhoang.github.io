import { FC, ReactElement, useEffect, useRef } from 'react';
import { SpinTemplate } from '../spin-template/spin-template';
import { useAppContext } from '../../app/providers/AppContext';
import { ExtraSpins } from '../extra-spins/extra-spins';
import { Invitation } from '../invitation/invitation';
import { Footer } from '../footer/footer';
import BackgroundSound from '../../assets/sounds/Casino Background Loop.mp3';

import styles from './main-app.module.scss';

const MainApp: FC = (): ReactElement => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const { userData, isMobile, isAvailableToSpin } = useAppContext();

    useEffect(() => {
        const handleUserInteraction = () => {
            if (audioRef.current) {
                audioRef.current.play().catch((error) => {
                    console.error('Error playing audio:', error);
                });
            }
            // Remove event listener after first interaction
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
        };

        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('keydown', handleUserInteraction);
        document.addEventListener('touchstart', handleUserInteraction);

        return () => {
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
        };
    }, []);

    return (
        <div className={styles.app__wrapper}>
            <audio ref={audioRef} autoPlay={true} loop={true}>
                <source src={BackgroundSound} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
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

