import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { initializeDatabaseWithForexData } from './db/dbInit';
import exchangeController from './controllers/exchangeController';

dotenv.config();

const app = express();
const port = process.env.HTTP_PORT || 3000;

// Apply CORS as the very first middleware
app.use(cors({
  origin: 'http://localhost:4200', // Allow requests from Angular app
  methods: ['GET'],                // Specify allowed methods as needed
  credentials: true                // Allow credentials if needed
}));

app.use(express.json());            // JSON parser middleware
app.use('/api', exchangeController); // API routes

// Start the server
app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);

  try {
    await initializeDatabaseWithForexData();
    console.log('Database initialized and populated with Forex data.');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error initializing database';
    console.error(message);
  }
});

