import { FC, ReactElement } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Typography } from '../../shared/components/typography';
import { Button } from '../../shared/components/button';
import giftIcon from '../../assets/images/gift_icon.png';
import { useNavigate } from 'react-router-dom';
import timeIcon from '../../assets/images/time_icon.png';
import styles from './main-app.module.scss';
import { SpinTemplate } from '../spin-template/spin-template';
import { useAppContext } from '../../app/providers/AppContext';

const MainApp: FC = (): ReactElement => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
    const { userData, updateFreeSpins, updateBonusSpins, updateTempWinScore } = useAppContext();

    const onNavigateToBuyPage = () => {
        navigate('/whiskers/buy');
    };

    return (
        <div className={styles.app__wrapper}>
            <div className={styles.app__container}>
                {/* Spin Template */}
                <SpinTemplate />

                <div className={styles.app__extra_spins}>
                    <div className={styles.app__extra_spins__free_spin}>
                        <Typography fontSize={isMobile ? '16px' : '40px'}>Free spins</Typography>
                        <div className={styles.app__extra_spins__free_spin__score}>
                            <Typography
                                color={userData.spinsAvailable === 0 ? '#73747f' : '#fff'}
                                fontSize={isMobile ? '36px' : '50px'}
                                fontFamily="Roundy Rainbows, sans-serif"
                            >
                                {userData.spinsAvailable}
                            </Typography>
                            {userData?.spinsAvailable < 2 ? (
                                <div className={styles.app__extra_spins__free_spin__recharge}>
                                    <img className={styles.app__extra_spins__free_spin__time_icon} src={timeIcon} />
                                    <Typography
                                        fontSize={isMobile ? '12px' : '50px'}
                                        fontFamily="Montserrat, sans-serif"
                                    >
                                        New spin in <br /> 5 hours
                                    </Typography>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className={styles.app__extra_spins__bonus_spin}>
                        <div className={styles.app__extra_spins__bonus_spin__text_wrapper}>
                            <Typography fontSize={isMobile ? '16px' : '40px'}>Bonus spins</Typography>
                            <div className={styles.app__extra_spins__bonus_spin__buy_spins}>
                                <Typography
                                    color={userData.bonusSpins === 0 ? '#73747f' : '#fff'}
                                    fontSize={isMobile ? '36px' : '50px'}
                                    fontFamily="Roundy Rainbows, sans-serif"
                                >
                                    {userData.bonusSpins}
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
                                {userData.unclaimedTokens}
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

