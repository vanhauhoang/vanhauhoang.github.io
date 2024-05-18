import Lottie from 'lottie-react';
import { FC, ReactElement } from 'react';

type Props = {
    animationData: any;
    loop: boolean | number;
};

export const LottieAnimation: FC<Props> = ({ animationData, loop }): ReactElement => {
    return <Lottie animationData={animationData} loop={loop} />;
};

