import { FC, ReactElement, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Heading } from '../../shared/components/heading';
import { Logo } from '../../shared/components/logo';
import loaderIcon from '../../assets/images/loader.png';
import { Typography } from '../../shared/components/typography';
import { Button } from '../../shared/components/button';
import giftIcon from '../../assets/images/gift_icon.png';

import styles from './main-app.module.scss';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../../shared/components/api/user/user';

import { WheelDesktop } from '../wheel/wheel-desktop';
import { WheelMobile } from '../wheel/wheel-mobile';

const MainApp: FC = (): ReactElement => {
    const navigate = useNavigate();

    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
    const [isNeedRotateSpinIcon, setIsNeedRotateSpinIcon] = useState<boolean>(false);
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchUserById = async (userId: string) => {
            return await userApi.getUserInfoById(userId);
        };

        fetchUserById('1').then((res) => setUser(res.data));
    }, []);

    const onNavigateToBuyPage = () => {
        navigate('/whiskers/buy');
    };

    const handleSpinButtonClick = () => {
        const spinEvent = new Event('spin');
        window.dispatchEvent(spinEvent);
        setIsNeedRotateSpinIcon(true);
        setTimeout(() => {
            setIsNeedRotateSpinIcon(false);
        }, 2000);
    };

    return (
        <div className={styles.app__wrapper}>
            <div className={styles.app__container}>
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
                    <div onClick={handleSpinButtonClick} className={styles.app__spin_button}>
                        <img
                            className={`${styles.app__spin_button__loader} ${isNeedRotateSpinIcon ? styles.rotate : ''}`}
                            src={loaderIcon}
                        />
                        <Typography fontSize={isMobile ? '42px' : '120px'} fontFamily="Roundy Rainbows, sans-serif">
                            SPin
                        </Typography>
                    </div>
                </div>

                <div className={styles.app__extra_spins}>
                    <div className={styles.app__extra_spins__free_spin}>
                        <Typography fontSize={isMobile ? '16px' : '40px'}>Free spins</Typography>
                        <div className={styles.app__extra_spins__free_spin__score}>
                            <Typography fontSize={isMobile ? '36px' : '50px'} fontFamily="Roundy Rainbows, sans-serif">
                                2
                            </Typography>
                        </div>
                    </div>
                    <div className={styles.app__extra_spins__bonus_spin}>
                        <div className={styles.app__extra_spins__bonus_spin__text_wrapper}>
                            <Typography fontSize={isMobile ? '16px' : '40px'}>Bonus spins</Typography>
                            <div className={styles.app__extra_spins__bonus_spin__buy_spins}>
                                <Typography
                                    fontSize={isMobile ? '36px' : '50px'}
                                    fontFamily="Roundy Rainbows, sans-serif"
                                >
                                    75
                                </Typography>
                                <Button
                                    onClick={onNavigateToBuyPage}
                                    fontFamily={'Montserrat, sans-serif'}
                                    fontSize="16px"
                                    height={isMobile ? '34px' : '43px'}
                                    width="fit-content"
                                    textTransform={'none'}
                                    text={'Buy spins'}
                                    fontWeight={'bolder'}
                                    borderRadius={'30px'}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.app__invitation}>
                    <Button
                        imageLeft={giftIcon}
                        fontFamily={'Montserrat, sans-serif'}
                        height={isMobile ? '80px' : '200px'}
                        textTransform={'none'}
                        text={'Refer A Friend'}
                        subText={'Get 3 bonus spins'}
                        fontWeight={'bolder'}
                        borderRadius={'12px'}
                        stylesForTexts={{
                            main: { fontSize: isMobile ? '24px' : '42px', fontWeight: 'bold' },
                            sub: { fontSize: isMobile ? '18px' : '32px', fontWeight: 'normal' },
                        }}
                    />
                </div>

                <div className={styles.app__footer_connect}>
                    <div className={styles.app__footer_connect_container}>
                        <div className={styles.app__footer_connect_score}>
                            <Typography fontSize={isMobile ? '16px' : '40px'}>Unclaimed whisk</Typography>
                            <Typography fontSize={isMobile ? '30px' : '50px'} fontFamily="Roundy Rainbows, sans-serif">
                                10200
                            </Typography>
                        </div>
                        <Button
                            fontFamily={'Montserrat, sans-serif'}
                            height={isMobile ? '42px' : '42px'}
                            fontSize={isMobile ? '16px' : '40px'}
                            backgroundColor="#0080bb"
                            text={'Connect wallet'}
                            fontWeight={'normal'}
                            width={'fit-content'}
                            textTransform={'none'}
                            borderRadius="24px"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainApp;

