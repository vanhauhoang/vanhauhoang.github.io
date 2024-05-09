import { FC, ReactElement, useEffect, useState } from 'react';
import styles from './button.module.scss';

type Props = {
    text: string;
    subText?:string;
    fontSize?: string;
    height?: string;
    fontFamily?: string;
    fontWeight?: string;
    imageLeft?: string;
    imageRight?: string;
    width?: string;
    textTransform?: any;
    borderRadius?: string;
    
};

export const Button: FC<Props> = (props): ReactElement => {
    const { text, subText, fontSize = '16px', height = '', fontFamily, fontWeight, imageLeft, 
            imageRight, width = '100%', textTransform='uppercase', borderRadius} = props;

    const [shouldShake, setShouldShake] = useState(false);

    useEffect(() => {
        const shakeInterval = setInterval(() => {
            setShouldShake(true);
            setTimeout(() => {
                setShouldShake(false);
            }, 500); // Duration of the shake animation
        }, 10_000); // Repeat the shake effect every 2 seconds

        return () => clearInterval(shakeInterval);
    }, []); // Run only once when the component mounts

    return (
        <button style={{ fontSize, height, fontFamily, fontWeight, width, textTransform, borderRadius }} className={styles.button}>
            {imageLeft && <img className={`${styles.button__icon_left} ${shouldShake ? styles.shake : ''}`} src={imageLeft}/>}
            <div className={styles.button__text_conteiner}>   
                <span className={styles.button__text_conteiner__text}> {text}</span> 
                <span className={styles.button__text_conteiner__subtext}> {subText}</span>
            </div>  
            {imageRight && <img className={styles.button__icon_right} src={imageRight}/>}
        </button>
    );
};

