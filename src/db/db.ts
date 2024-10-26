import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    host: 'db',
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
});

pool.on('connect', () => console.log('Connected to the PostgreSQL database'));
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export const query = async (text: string, params?: any[]): Promise<any> => {
    if (!pool) throw new Error('Database connection not initialized.');
    return await pool.query(text, params);
};
