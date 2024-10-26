import { loadConfig } from './configLoader';

const { FCSAPI_KEY, FCSAPI_URL } = loadConfig();

// Define request structure for Forex API data
export const getForexDataRequest = (symbols: string[]): { url: string; params: { access_key: string; symbol: string } } => {
  if (!FCSAPI_KEY || !FCSAPI_URL) throw new Error('API credentials are missing.');

  const url = `${FCSAPI_URL}`;
  const params = { access_key: FCSAPI_KEY, symbol: symbols.join(',') };

  return { url, params };
};

// SQL query and table name generator for exchange rate
export const exchangeRateQuery = (
  date: string,
  baseCurrency: string,
  counterCurrency: string
): { queryText: string; values: string[] } => {
  const tableName = `forex_data_${date.replace(/-/g, '_')}`;
  const queryText = `SELECT * FROM ${tableName} WHERE symbol = $1`;
  const symbol = `${baseCurrency}/${counterCurrency}`;

  return { queryText, values: [symbol] };
};

