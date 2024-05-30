import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import BackgroundSound from '../../assets/sounds/Casino Background Loop.mp3';

export const AppLayout: FC = () => {
    useEffect(() => {
        //@ts-ignore
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        let source: AudioBufferSourceNode;

        const fetchAudio = async () => {
            const response = await fetch(BackgroundSound);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.loop = true;
            source.connect(audioContext.destination);
            source.start(0);
        };

        fetchAudio();

        return () => {
            if (source) {
                source.stop();
                source.disconnect();
            }
            audioContext.close();
        };
    }, []);

    return (
        <>
            <Outlet />
        </>
    );
};

