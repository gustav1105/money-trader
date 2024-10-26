// Define the data structure type for Forex data
interface ForexData {
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  change: number;
  changePercent: number;
  timestamp: number;
}

// Table creation query generator
export const createTableForTodayIfNotExists = (tableName: string): string => {
  return `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id SERIAL PRIMARY KEY,
      symbol VARCHAR(10) NOT NULL,
      open DECIMAL(10, 6),
      high DECIMAL(10, 6),
      low DECIMAL(10, 6),
      close DECIMAL(10, 6),
      change DECIMAL(10, 6),
      change_percent DECIMAL(5, 2),
      timestamp BIGINT,
      last_update TIMESTAMP DEFAULT NOW()
    );
  `;
};

// Insert data query generator
export const insertDataIntoTable = (tableName: string, data: ForexData): string => {
  return `
    INSERT INTO ${tableName} (symbol, open, high, low, close, change, change_percent, timestamp, last_update)
    VALUES ('${data.symbol}', ${data.open}, ${data.high}, ${data.low}, ${data.close}, ${data.change}, ${data.changePercent}, ${data.timestamp}, NOW())
  `;
};

// Query for available dates
export const fetchAvailableDates = (): string => {
  return `
    SELECT table_name FROM information_schema.tables
    WHERE table_name LIKE 'forex_data_%';
  `;
};

// Query for supported currencies
export const fetchSupportedCurrencies = (date: string): string => {
  const tableName = `forex_data_${date.replace(/-/g, '_')}`;
  return `
    SELECT DISTINCT symbol FROM ${tableName};
  `;
};

