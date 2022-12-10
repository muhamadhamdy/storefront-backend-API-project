import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,
    ENV
} = process.env;
let currentDB = POSTGRES_DB;
if (ENV === 'test') {
    currentDB = POSTGRES_TEST_DB;
}
if (ENV === 'dev') {
    currentDB = POSTGRES_DB;
}
const client = new Pool({
    host: POSTGRES_HOST,
    database: currentDB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: parseInt(POSTGRES_PORT || '5432')
});

export default client;
