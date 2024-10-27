import { query } from './db';
import { createTableForTodayIfNotExistsQuery, insertDataIntoTableQuery, exchangeRateQuery } from '../../library/src';

export const createTableForTodayIfNotExists = async (tableName: string): Promise<void> => {
  const createTableQuery = createTableForTodayIfNotExistsQuery(tableName);
  
  await query(createTableQuery);
};

export const insertDataIntoTable = async (tableName: string, symbol: string, data: any): Promise<void> => {
  const insertQuery = `
    INSERT INTO ${tableName} (symbol, open, high, low, close, change, change_percent, timestamp, last_update)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
  `;
  await query(insertQuery, [
    symbol, data.open, data.high, data.low, data.close, data.change, data.changePercent, data.timestamp
  ]);
};

export const exchangeRate = (
  date:string,
  baseCurrency: string,
  counterCurrency: string
): { queryText: string; values: string[] } => {
  const queryText = exchangeRateQuery(date);
  const symbol = `${baseCurrency}/${counterCurrency}`;

  return { queryText, values: [symbol] };
};
