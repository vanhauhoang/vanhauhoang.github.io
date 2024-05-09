import { FC, ReactElement } from 'react';
import styles from './button.module.scss';

type Props = {
    text: string;
    fontSize?: string;
    height?: string;
    fontFamily?: string;
};

export const Button: FC<Props> = (props): ReactElement => {
    const { text, fontSize = '16px', height = '', fontFamily } = props;

    return (
        <button style={{ fontSize, height, fontFamily }} className={styles.button}>
            {text}
        </button>
    );
};

