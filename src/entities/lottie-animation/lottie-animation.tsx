import Lottie from 'lottie-react';
import { FC, ReactElement, useEffect, useRef } from 'react';
import { AnimationItem } from 'lottie-web';

type Props = {
    animationData: any;
    loop: boolean | number;
};

export const LottieAnimation: FC<Props> = ({ animationData, loop }): ReactElement => {
    const lottieRef = useRef<any>(null);

    return <Lottie animationData={animationData} loop={loop} ref={lottieRef} />;
};

