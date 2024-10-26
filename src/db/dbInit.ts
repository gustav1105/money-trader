import { createTableForTodayIfNotExists, insertDataIntoTable } from './dbFunctions';
import { getTableNameForToday } from './utils';
import { getForexData } from '../services/forexService';
import { supportedCurrencies } from '../services/currencies';

export const initializeDatabaseWithForexData = async (): Promise<void> => {
    const tableName = getTableNameForToday();
    await createTableForTodayIfNotExists(tableName);

    // Fetch Forex data and populate the table
    const forexData = await getForexData(supportedCurrencies);
    for (const data of forexData) {
        await insertDataIntoTable(tableName, data.symbol, data);
    }
};

