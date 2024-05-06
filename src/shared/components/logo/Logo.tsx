import { FC, ReactElement } from 'react';
import styles from './logo.module.scss';

type Props = {};

export const Logo: FC<Props> = (props): ReactElement => {
    return <span className={styles.logo}>Whiskers</span>;
};

