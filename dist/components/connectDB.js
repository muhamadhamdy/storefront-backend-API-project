"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_TEST_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_PORT, ENV } = process.env;
let currentDB = POSTGRES_DB;
if (ENV === 'test') {
    currentDB = POSTGRES_TEST_DB;
}
if (ENV === 'dev') {
    currentDB = POSTGRES_DB;
}
const client = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: currentDB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: parseInt(POSTGRES_PORT || '5432')
});
exports.default = client;
