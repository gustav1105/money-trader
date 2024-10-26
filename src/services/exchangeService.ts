import { query } from '../db/db';

export const exchangeRate = async (date: string, baseCurrency: string, counterCurrency: string, amount: number) => {
  const tableName = `forex_data_${date.replace(/-/g, '_')}`;
  const queryText = `
    SELECT * FROM ${tableName}
    WHERE symbol = $1
  `;

  const result = await query(queryText, [`${baseCurrency}/${counterCurrency}`]);

  if (result.rows.length === 0) {
    throw new Error(`No data found for ${baseCurrency}/${counterCurrency} on ${date}`);
  }

  const rate = parseFloat(result.rows[0].close);
  return {
    rate: rate,
    convertedAmount: rate * amount,
  };
};

export const fetchAvailableDates = async (): Promise<string[]> => {
  try {
    const result = await query(`
      SELECT table_name FROM information_schema.tables
      WHERE table_name LIKE 'forex_data_%';
    `);

    // Typing `row` to ensure `table_name` is a string
    return result.rows.map((row: { table_name: string }) => 
      row.table_name.replace('forex_data_', '').replace(/_/g, '-')
    );
  } catch (error) {
    console.error('Error fetching available dates:', error);
    throw error;
  }
};

export const fetchSupportedCurrencies = async (date: string): Promise<string[]> => {
  const tableName = `forex_data_${date.replace(/-/g, '_')}`;

  try {
    const result = await query(`
      SELECT DISTINCT symbol FROM ${tableName}
    `);

    // Typing `row` to ensure `symbol` is a string
    return result.rows.map((row: { symbol: string }) => row.symbol);
  } catch (error) {
    console.error(`Error fetching supported currencies for ${date}:`, error);
    throw error;
  }
};

