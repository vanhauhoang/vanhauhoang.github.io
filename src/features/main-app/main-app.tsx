import { FC, ReactElement, useRef, useState } from 'react';
import { SpinTemplate } from '../spin-template/spin-template';
import { useAppContext } from '../../app/providers/AppContext';
import { ExtraSpins } from '../extra-spins/extra-spins';
import { Invitation } from '../invitation/invitation';
import { Footer } from '../footer/footer';
import BackgroundSound from '../../assets/sounds/Casino Background Loop.mp3';
import { FaVolumeMute } from 'react-icons/fa';
import styles from './main-app.module.scss';
import { AiOutlineMuted } from 'react-icons/ai';

const MainApp: FC = (): ReactElement => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const { userData, isMobile, isAvailableToSpin } = useAppContext();
    const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);

    // useEffect(() => {
    //     const handleUserInteraction = () => {
    //         if (audioRef.current) {
    //             audioRef.current.muted = false; // Unmute the audio
    //             setIsAudioMuted(false);
    //             audioRef.current.play().catch((error) => {
    //                 console.error('Error playing audio:', error);
    //             });
    //         }
    //     };

    //     const setupAudio = () => {
    //         if (audioRef.current) {
    //             audioRef.current.muted = true; // Ensure audio starts muted
    //             audioRef.current.play().catch((error) => {
    //                 console.error('Error playing audio:', error);
    //             });
    //         }
    //     };

    //     // const addInteractionListeners = () => {
    //     //     document.addEventListener('click', handleUserInteraction);
    //     //     document.addEventListener('keydown', handleUserInteraction);
    //     //     document.addEventListener('touchstart', handleUserInteraction);
    //     // };

    //     // const removeInteractionListeners = () => {
    //     //     document.removeEventListener('click', handleUserInteraction);
    //     //     document.removeEventListener('keydown', handleUserInteraction);
    //     //     document.removeEventListener('touchstart', handleUserInteraction);
    //     // };

    //     const initializeTelegramWebApp = () => {
    //         // @ts-ignore
    //         if (window.Telegram && window.Telegram.WebApp) {
    //             // @ts-ignore
    //             window.Telegram.WebApp.ready();
    //             // @ts-ignore
    //             window.Telegram.WebApp.onEvent('viewportChanged', () => {
    //                 setupAudio(); // Re-setup audio on each viewport change
    //                 // addInteractionListeners(); // Ensure interaction listeners are added
    //             });
    //         }
    //     };

    //     // Setup audio and listeners on initial load
    //     setupAudio();
    //     // addInteractionListeners();

    //     // Initialize Telegram Web App
    //     initializeTelegramWebApp();

    //     // Clean up event listeners on component unmount
    //     return () => {
    //         removeInteractionListeners();
    //     };
    // }, []);

    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.muted = false;
            audioRef.current.play().catch((error) => {
                console.error('Error playing audio:', error);
            });
            setIsAudioMuted(false);
        }
    };

    const muteAudio = () => {
        if (audioRef.current) {
            audioRef.current.muted = true;
            setIsAudioMuted(true);
        }
    };

    return (
        <div className={styles.app__wrapper}>
            <div className={styles.app__mute_icon}>
                {isAudioMuted ? (
                    <AiOutlineMuted className={styles.icon} onClick={playAudio} />
                ) : (
                    <FaVolumeMute className={styles.icon} onClick={muteAudio} />
                )}
            </div>
            <audio ref={audioRef} autoPlay={true} loop={true} muted={isAudioMuted}>
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

