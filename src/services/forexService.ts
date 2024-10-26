import axios from 'axios';
import { loadConfig } from './configLoader';
import { ForexData } from './types';

const { FCSAPI_KEY, FCSAPI_URL } = loadConfig();

export const getForexData = async (symbols: string[]): Promise<ForexData[]> => {
  if (!FCSAPI_KEY) throw new Error('FCSAPI_KEY is not defined in the environment variables.');
  if (!FCSAPI_URL) throw new Error('FCSAPI_URL is not defined in the environment variables.'); // Ensure URL is defined

  const symbolString = symbols.join(',');

  console.log(`Requesting data for symbols: ${symbolString}`);
  const response = await axios.get(FCSAPI_URL as string, {  // Use type assertion here
    params: { access_key: FCSAPI_KEY, symbol: symbolString }
  });

  if (response.status !== 200 || !response.data.response) {
    throw new Error(`Failed API request with status ${response.status}`);
  }

  return response.data.response.map((item: any) => ({
    symbol: item.s,
    open: parseFloat(item.o),
    high: parseFloat(item.h),
    low: parseFloat(item.l),
    close: parseFloat(item.c),
    change: parseFloat(item.ch),
    changePercent: parseFloat(item.cp),
    timestamp: parseInt(item.t, 10)
  }));
};

