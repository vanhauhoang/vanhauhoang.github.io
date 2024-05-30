import { FC, ReactElement } from 'react';
import { Heading } from '../../shared/components/heading';
import { Logo } from '../../shared/components/logo';

import styles from './start-screen.module.scss';
import { Button } from '../../shared/components/button';
import { useNavigate } from 'react-router-dom';

const StartScreen: FC = (): ReactElement => {
    const navigate = useNavigate();

    const onRedirectToGame = () => {
        navigate('/whiskers/game');
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.logo_and_heading}>
                    <Logo />
                    <div className={styles.heading_wrapper}>
                        <Heading level="h1">Spin&Earn</Heading>
                    </div>
                </div>
                <Button onClick={onRedirectToGame} fontFamily="Montserrat, sans-serif" text="Start Game" />
            </div>
        </div>
    );
};

export default StartScreen;

