import React, { useState } from 'react';
import { Heading } from '../../shared/components/heading';
import { Logo } from '../../shared/components/logo';
import { useMediaQuery } from 'react-responsive';
import { WheelMobile } from '../../entities/wheel/wheel-mobile';
import { WheelDesktop } from '../../entities/wheel/wheel-desktop';
import { Typography } from '../../shared/components/typography';

import soundWheel from '../../assets/sounds/Fortune-Prize-Wheel-01.mp3';
import loaderIcon from '../../assets/images/loader.png';

import styles from './spin-template.module.scss';
import { useAppContext } from '../../app/providers/AppContext';

export const SpinTemplate = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
    // const audioRef = React.createRef<any>();
    // const [isNeedRotateSpinIcon, setIsNeedRotateSpinIcon] = useState<boolean>(false);
    // const { userData, isFreeSpins, updateFreeSpins, updateBonusSpins, updateTempWinScore } = useAppContext();

    // const handleSpinButtonClick = () => {
    //     if (isNeedRotateSpinIcon || !isFreeSpins === null) return;

    //     if (!isFreeSpins) {
    //         updateBonusSpins();
    //     } else {
    //         updateFreeSpins();
    //     }

    //     const spinEvent = new Event('spin');
    //     window.dispatchEvent(spinEvent);

    //     setIsNeedRotateSpinIcon(true);

    //     audioRef.current.play();

    //     setTimeout(() => {
    //         setIsNeedRotateSpinIcon(false);
    //     }, 8_000);
    // };

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

