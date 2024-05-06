import { FC, ReactElement } from 'react';
import styles from './logo.module.scss';

type Props = {
    title?: string;
};

export const Logo: FC<Props> = (props): ReactElement => {
    const { title } = props;
    return <span className={styles.logo}>{title || 'Whiskers'}</span>;
};

