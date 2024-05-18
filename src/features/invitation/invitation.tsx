import { FC, ReactElement } from 'react';
import { Button } from '../../shared/components/button';
import giftIcon from '../../assets/images/gift_icon.png';

import styles from './invitation.module.scss';

interface Props {
    isMobile: boolean;
}

export const Invitation: FC<Props> = ({ isMobile }): ReactElement => {
    return (
        <div className={styles.app__invitation}>
            <Button
                imageLeft={giftIcon}
                fontFamily={'Montserrat, sans-serif'}
                height={isMobile ? '65px' : '200px'}
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
    );
};

