export function getTimeLeftFromTimestamp(timestamp: string): string {
    const now = new Date();
    const targetTime = new Date(timestamp);
    targetTime.setHours(targetTime.getHours() + 5);
    const timeDiff = targetTime.getTime() - now.getTime();

    if (timeDiff <= 0) {
        return '';
    }

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    if (hours > 1) {
        return `${hours} hours`;
    } else if (hours === 1) {
        return `1 hour`;
    } else if (minutes >= 1) {
        return `${minutes} minutes`;
    } else {
        return `${seconds} seconds`;
    }
}

