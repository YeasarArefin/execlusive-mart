const generateFormattedTime = () => {
    const date = new Date('2024-12-16T09:00:00');

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    };
    /*@ts-ignore*/
    const formatted = date.toLocaleString('en-US', options);

    return formatted;
};
export default generateFormattedTime;