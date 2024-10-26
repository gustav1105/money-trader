
import express, { Request, Response, Router, RequestHandler } from 'express';
import { fetchAvailableDates, fetchSupportedCurrencies, exchangeRate } from '../services/exchangeService';

const router: Router = express.Router();

const getAvailableDates: RequestHandler = async (req: Request, res: Response) => {
  try {
    const dates = await fetchAvailableDates();
    res.json(dates); // No `return` statement here
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch available dates';
    res.status(500).json({ error: message });
  }
};

const getSupportedCurrencies: RequestHandler = async (req: Request, res: Response) => {
  const { date } = req.query;

  if (!date) {
    res.status(400).json({ error: 'Date is required' }); // No `return` statement here
    return;
  }

  try {
    const currencies = await fetchSupportedCurrencies(date as string);
    res.json(currencies); // No `return` statement here
  } catch (error) {
    const message = error instanceof Error ? error.message : `Failed to fetch supported currencies for ${date}`;
    res.status(500).json({ error: message });
  }
};

const getExchangeRate: RequestHandler = async (req: Request, res: Response) => {
  const { date, baseCurrency, counterCurrency, amount } = req.query;

  if (!date || !baseCurrency || !counterCurrency || !amount) {
    res.status(400).json({ error: 'Date, baseCurrency, counterCurrency, and amount are required' });
    return;
  }

  try {
    const rateData = await exchangeRate(
      date as string,
      baseCurrency as string,
      counterCurrency as string,
      parseFloat(amount as string)
    );
    res.json(rateData); // No `return` statement here
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch exchange rate';
    res.status(500).json({ error: message });
  }
};

// Attach handlers to routes
router.get('/available-dates', getAvailableDates);
router.get('/supported-currencies', getSupportedCurrencies);
router.get('/exchange-rate', getExchangeRate);

export default router;

