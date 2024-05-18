import { FC, ReactElement } from 'react';
import styles from './main-app.module.scss';
import { SpinTemplate } from '../spin-template/spin-template';
import { useAppContext } from '../../app/providers/AppContext';
import { ExtraSpins } from '../extra-spins/extra-spins';
import { Invitation } from '../invitation/invitation';
import { Footer } from '../footer/footer';

const MainApp: FC = (): ReactElement => {
    const { userData } = useAppContext();

    return (
        <div className={styles.app__wrapper}>
            <div className={styles.app__container}>
                <SpinTemplate />
                <ExtraSpins userData={userData} />
                <Invitation />
                <Footer unclaimedTokens={userData?.unclaimedTokens} />
            </div>
        </div>
    );
};

export default MainApp;

