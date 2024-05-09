import { FC, ReactElement } from 'react';
import styles from './logo.module.scss';

type Props = {
    title?: string;
    fontSize?: string;
};

export const Logo: FC<Props> = (props): ReactElement => {
    const { title, fontSize = '32px' } = props;
    return (
        <span style={{ fontSize }} className={styles.logo}>
            {title || 'Whiskers'}
        </span>
    );
};

