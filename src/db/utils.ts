export const getTableNameForToday = (): string => {
    const today = new Date();
    return `forex_data_${today.toISOString().slice(0, 10).replace(/-/g, '_')}`;
};
