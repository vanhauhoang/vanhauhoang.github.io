import { FC, ReactElement } from 'react';
import styles from './button.module.scss';

type Props = {
    text: string;
};

export const Button: FC<Props> = (props): ReactElement => {
    const { text } = props;

    return <button className={styles.button}>{text}</button>;
};

