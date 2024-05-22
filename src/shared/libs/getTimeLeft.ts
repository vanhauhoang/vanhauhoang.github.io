export function getTimeLeft(lastTime: string) {
    const now: any = new Date();
    const endTime: any = new Date(lastTime);
    const timeDiff = endTime - now;

    if (!lastTime) return '5 hours';

    if (timeDiff <= 0) {
        return '';
    }

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    if (hours > 1) {
        return `${hours} hours`;
    } else if (hours === 1) {
        return '1 hour';
    } else if (minutes >= 1) {
        return `${minutes} minutes`;
    } else {
        return `${seconds} seconds`;
    }
}

