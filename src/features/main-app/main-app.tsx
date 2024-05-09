import { FC, ReactElement } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Heading } from '../../shared/components/heading';
import { Logo } from '../../shared/components/logo';
import fakeSpin from '../../assets/images/spin_mock.png';
import loaderIcon from '../../assets/images/loader.png';
import { Typography } from '../../shared/components/typography';
import { Button } from '../../shared/components/button';

import styles from './main-app.module.scss';

const MainApp: FC = (): ReactElement => {
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });

    return (
        <div className={styles.app__wrapper}>
            <div className={styles.app__container}>
                <div className={styles.app__spin}>
                    <div className={styles.app__title_and_logo}>
                        <Logo fontSize={isMobile ? '35px' : '70px'} />
                        <span className={styles.app__title}>
                            <Heading className={styles.app__heading} level="h1">
                                Spin&Earn
                            </Heading>
                        </span>
                    </div>
                    <img className={styles.app__spin_img} src={fakeSpin} />
                    <div className={styles.app__spin_button}>
                        <img className={styles.app__spin_button__loader} src={loaderIcon} />
                        <Typography fontSize={isMobile ? '50px' : '120px'} fontFamily="Roundy Rainbows, sans-serif">
                            SPin
                        </Typography>
                    </div>
                </div>
                <div className={styles.app__footer_connect}>
                    <div className={styles.app__footer_connect_container}>
                        <div className={styles.app__footer_connect_score}>
                            <Typography fontSize={isMobile ? '20px' : '40px'}>Unclaimed whisk</Typography>
                            <Typography fontSize={isMobile ? '25px' : '50px'} fontFamily="Roundy Rainbows, sans-serif">
                                10200
                            </Typography>
                        </div>
                        <Button
                            fontFamily={'Montserrat, sans-serif'}
                            height={'70px'}
                            fontSize={isMobile ? '20px' : '40px'}
                            text={'Connect wallet'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainApp;

