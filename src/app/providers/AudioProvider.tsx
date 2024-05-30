import { createContext, useContext, FC, ReactNode, useRef } from 'react';
import BackgroundSound from '../../assets/sounds/Casino Background Loop.mp3';

const AudioContext = createContext<{ startAudio: () => void } | undefined>(undefined);

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};

export const AudioProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    const startAudio = async () => {
        // @ts-ignore
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const response = await fetch(BackgroundSound);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.loop = true;
        source.connect(audioContext.destination);
        source.start(0);

        //@ts-ignore
        // Store source in ref to stop it later if needed
        audioRef.current = source as unknown as HTMLAudioElement;
    };

    return <AudioContext.Provider value={{ startAudio }}>{children}</AudioContext.Provider>;
};

