import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import kitty from '../../assets/images/kitty.png';
import loaderIcon from '../../assets/images/loader.png';
import { useAppContext } from '../../app/providers/AppContext';
import soundWheel from '../../assets/sounds/Fortune-Prize-Wheel-01.mp3';
import React from 'react';
import { Typography } from '../../shared/components/typography';
import { useMediaQuery } from 'react-responsive';

import styles from './wheel.module.scss';

interface WheelMobileProps {}

export const WheelMobile: FC<WheelMobileProps> = (): ReactElement => {
    const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
    const { isFreeSpins, updateFreeSpins, updateBonusSpins, updateTempWinScore } = useAppContext();
    const [isNeedRotateSpinIcon, setIsNeedRotateSpinIcon] = useState<boolean>(false);
    const audioRef = React.createRef<any>();
    const [imageLoaded, setImageLoaded] = useState(false);
    const image = useRef(new Image());
    const canvasRef = useRef<any>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | any>(null);

    const sectorsData = [
        { value: 10, colour: '#10c569' },
        { value: 5, colour: '#0694d4' },
        { value: 100, colour: '#f34a3a' },
        { value: 50, colour: '#f6bd0d' },
        { value: 10, colour: '#10c569' },
        { value: 5, colour: '#0694d4' },
        { value: 100, colour: '#f34a3a' },
        { value: 50, colour: '#f6bd0d' },
        { value: 10, colour: '#10c569' },
        { value: 5, colour: '#0694d4' },
    ];

    //constants
    const increaseCoeff = 4; //for canvas better quality

    const pictureParams = {
        image: image,
        x: 138.25 * increaseCoeff,
        y: 131.25 * increaseCoeff,
        w: 73.5 * increaseCoeff,
        h: 80.5 * increaseCoeff,
    };

    const width = 350; //canvas observable width
    const height = 350;
    const dpiWidth = width * increaseCoeff; //canvas real width
    const dpiHeight = height * increaseCoeff;
    const centerX = Math.floor(dpiWidth / 2); //center point of wheel
    const centerY = Math.floor(dpiHeight / 2);
    const radius1 = 158 * increaseCoeff; //biggest radius
    const radiusMicroPointCircle = 148.4 * increaseCoeff;
    const radius2 = 138.5 * increaseCoeff;
    const radius3 = 128.8 * increaseCoeff;
    const radiusText = 100 * increaseCoeff;
    const radius4 = 44.8 * increaseCoeff;
    const radius5 = 37.8 * increaseCoeff;
    const radius6 = 35.7 * increaseCoeff; //smallest radius
    const radiusMicroPoint = 4 * increaseCoeff;
    const circleColour1 = '#1d3649';
    const circleColour2 = 'rgba(0,0,0,0.15)';
    const circleColour4 = '#1d3749';
    const circleColour5 = '#f4f4f4';
    const circleColour6 = '#0594d3';
    const circleColourMicro = '#f4f4f4';
    const textFontSize = 28;
    const dpiTextFontSize = textFontSize * increaseCoeff;
    const textStyles = {
        fillColor: '#fff',
        textFont: `${dpiTextFontSize}px Roundy Rainbows, sans-serif`,
    };
    const [beginTwistAngle, setBeginTwistAngel] = useState(0.25); //changes after every spin
    const turns = 2; //number of turns for one spin
    const [winAngle, setWinAngle] = useState(0);
    const oneSectorAngle = 1 / sectorsData.length;
    const inverseValuesSum = sectorsData?.reduce((total, elem) => total + 1 / elem.value, 0);
    const [spinCount, setSpinCount] = useState(0);

    useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                setCtx(context);
            }
        }
    }, []);

    useEffect(() => {
        if (canvasRef?.current) {
            if (ctx) {
                canvasRef.current.width = dpiWidth;
                canvasRef.current.height = dpiHeight;
                canvasRef.current.style.width = width + 'px';
                canvasRef.current.style.height = height + 'px';
                InitializeWheel(); // Initialize the wheel
            }
        }
    }, [imageLoaded, ctx, dpiWidth, dpiHeight, InitializeWheel]);

    useEffect(() => {
        image.current.onload = () => {
            setImageLoaded(true);
        };
        image.current.src = kitty;
    }, []);

    function InitializeWheel() {
        assignProbabilities();
        drawWheel(beginTwistAngle, sectorsData);
    }

    const handleSpinButtonClick = () => {
        if (isNeedRotateSpinIcon || isFreeSpins === null) return; //

        if (!isFreeSpins) {
            updateBonusSpins();
        } else {
            updateFreeSpins();
        }

        twistWheel();

        setIsNeedRotateSpinIcon(true);

        audioRef.current.play();

        setTimeout(() => {
            setIsNeedRotateSpinIcon(false);
        }, 8_000);
    };

    function assignProbabilities(coeff = 360) {
        //probabilities sum will might be equal to 1, so the remainder part will be added to the smallest value
        let wholeProbabilityRemainder = coeff;
        let minValueSectorIndex = 0;
        for (let i = 0; i < sectorsData.length; i++) {
            //count probability of elem according to whole value and round it
            //@ts-ignore
            sectorsData[i].probability = Math.floor(coeff / sectorsData[i].value / inverseValuesSum); // 1/x_i/sigma(1/x_i)
            // reduce probability remainder
            //@ts-ignore
            wholeProbabilityRemainder -= sectorsData[i].probability;
            // find min elem
            if (sectorsData[i].value < sectorsData[minValueSectorIndex].value) minValueSectorIndex = i;
        }
        // add probability remainder to the smallest value
        //@ts-ignore
        sectorsData[minValueSectorIndex].probability += wholeProbabilityRemainder;
    }

    function twistWheel() {
        const randomSectorValue = randomSector();
        //@ts-ignore
        const randomSectorCenter = -oneSectorAngle * (randomSectorValue + 0.5);
        console.log(randomSectorCenter);

        if (spinCount) setBeginTwistAngel(winAngle);

        setSpinCount((prev) => prev++);

        setWinAngle(randomSectorCenter);
        console.log(winAngle);

        if (winAngle >= 1) setWinAngle((prev) => prev--);
        if (winAngle < 0) setWinAngle((prev) => ++prev);

        console.log(winAngle);

        animate({
            duration: 5000,
            timing: timing,
        });
    }

    //get random sector according to sectors probabilities
    function randomSector() {
        const randomNumber = Math.floor(Math.random() * 360) + 1; // 1...360

        for (let i = 0, upperBorder = 0; i < sectorsData.length; i++) {
            //@ts-ignore
            upperBorder += sectorsData[i].probability;
            if (randomNumber < upperBorder) {
                // add score setter
                updateTempWinScore(sectorsData?.[i]?.value);
                return i;
            }
        }
    }
    //@ts-ignore
    function animate({ timing, duration }) {
        const start = performance.now();
        requestAnimationFrame(function animate(time) {
            // timeFraction from 0 to 1
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            const progress = beginTwistAngle + timing(timeFraction) * (-beginTwistAngle + winAngle + turns);
            redrawWheel(progress);

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        });
    }
    //@ts-ignore
    function timing(timeFraction) {
        if (timeFraction < 0.25) {
            return timeFraction * 2;
        } else {
            return Math.pow(timeFraction, 1 / 2);
        }
    }
    //@ts-ignore
    function redrawWheel(beginTwistAngle) {
        ctx.clearRect(0, 0, dpiWidth, dpiHeight);
        drawWheel(beginTwistAngle, sectorsData);
    }
    //@ts-ignore
    function drawWheel(beginAngle, sectorsData) {
        drawOuterWheelPart();
        drawMiddleWheelPart(beginAngle, sectorsData);
        drawInnerWheelPart();

        const { image, x, y, w, h } = pictureParams;
        //@ts-ignore
        ctx.drawImage(image.current, x, y, w, h);

        drawTriangle();
    }

    function drawOuterWheelPart() {
        drawCircleBorder(centerX, centerY, radius1, radius2, circleColour1);
        drawPointsOnCircle(
            centerX,
            centerY,
            radiusMicroPointCircle,
            radiusMicroPoint,
            oneSectorAngle,
            circleColourMicro,
        );
    }
    //@ts-ignore
    function drawMiddleWheelPart(beginAngle, sectorsData) {
        let currentAngle = beginAngle;
        //@ts-ignore
        sectorsData.map((sector) => {
            drawWholeSector(
                radius2,
                radiusText,
                currentAngle,
                currentAngle + oneSectorAngle,
                sector.colour,
                sector.value,
            );

            currentAngle += oneSectorAngle;
        });

        drawCircleBorder(centerX, centerY, radius2, radius3, circleColour2);
    }

    function drawInnerWheelPart() {
        drawCircleBorder(centerX, centerY, radius5, radius4, circleColour4);
        drawCircleBorder(centerX, centerY, radius6, radius5, circleColour5);
        drawCircle(centerX, centerY, radius6, circleColour6);
    }
    //@ts-ignore
    function drawCircleBorder(centerX, centerY, radiusExternal, radiusInternal, colour) {
        ctx.save();

        ctx.fillStyle = colour;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radiusExternal, 0, 2 * Math.PI, false);
        ctx.arc(centerX, centerY, radiusInternal, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
    //@ts-ignore
    function drawCircle(centerX, centerY, radius, colour) {
        ctx.save();

        ctx.fillStyle = colour;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
    //@ts-ignore
    function drawPointsOnCircle(circleCenterX, circleCenterY, circleRadius, pointRadius, angle, colour) {
        let centerX, centerY;
        let currentAngle = 0;

        while (currentAngle < 1) {
            centerX = circleCenterX + circleRadius * Math.cos(currentAngle * 2 * Math.PI);
            centerY = circleCenterY + circleRadius * Math.sin(currentAngle * 2 * Math.PI);

            drawCircle(centerX, centerY, pointRadius, colour);

            currentAngle += angle;
        }
    }

    function drawTriangle() {
        const side = 20 * increaseCoeff;
        ctx.save();

        ctx.strokeStyle = '#f4f4f4';
        ctx.fillStyle = '#f4f4f4';
        ctx.lineWidth = 10 * increaseCoeff;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(centerX + 140 * increaseCoeff, centerY);
        ctx.lineTo(centerX + 140 * increaseCoeff + (side * Math.sqrt(3)) / 2, centerY + side / 2);
        ctx.lineTo(centerX + 140 * increaseCoeff + (side * Math.sqrt(3)) / 2, centerY - side / 2);

        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        ctx.restore();
    }
    //@ts-ignore
    function drawWholeSector(radius, radiusText, startAnglePart, endAnglePart, sectorFillColor, text) {
        const startAngle = startAnglePart * 2 * Math.PI;
        const endAngle = endAnglePart * 2 * Math.PI;
        const midAngle = ((startAnglePart + endAnglePart) / 2) * 2 * Math.PI;

        drawSector(radius, startAngle, endAngle, sectorFillColor);
        drawSectorText(midAngle, radiusText, text);
    }

    //@ts-ignore
    function drawSector(radius, startAngle, endAngle, sectorFillColor) {
        ctx.save();

        ctx.fillStyle = sectorFillColor;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
    //@ts-ignore
    function drawSectorText(middleAngle, radius, text) {
        ctx.save();

        ctx.fillStyle = textStyles.fillColor;
        ctx.font = textStyles.textFont;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.translate(centerX, centerY);
        ctx.rotate(middleAngle);
        ctx.fillText(text, radius, 0);

        ctx.restore();
    }
    return (
        <>
            <audio ref={audioRef}>
                <source src={soundWheel} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <canvas ref={canvasRef} id="canvas" />
            <div onClick={handleSpinButtonClick} className={styles.app__spin_button}>
                <img
                    className={`${styles.app__spin_button__loader} ${isNeedRotateSpinIcon ? styles.rotate : ''}`}
                    src={loaderIcon}
                />
                <Typography fontSize={isMobile ? '42px' : '120px'} fontFamily="Roundy Rainbows, sans-serif">
                    SPin
                </Typography>
            </div>
        </>
    );
};

