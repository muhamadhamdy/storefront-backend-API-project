"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = void 0;
const connectDB_1 = __importDefault(require("../../components/connectDB"));
class Categories {
    async index() {
        try {
            const conn = await connectDB_1.default.connect();
            const sqlQuery = 'SELECT * FROM categories';
            const result = await conn.query(sqlQuery);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Couldn't execute your request ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await connectDB_1.default.connect();
            const sqlQuery = 'SELECT * FROM categories WHERE id=($1)';
            const result = await conn.query(sqlQuery, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product with id ${id}. Error: ${err}`);
        }
    }
    async create(category) {
        try {
            const conn = await connectDB_1.default.connect();
            const sqlQuery = 'INSERT INTO categories (categoryname) VALUES($1) RETURNING *';
            const result = await conn.query(sqlQuery, [category.categoryname]);
            const categoryResult = result.rows[0];
            conn.release();
            return categoryResult;
        }
        catch (err) {
            throw new Error(`Could not add new category ${category.categoryname}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await connectDB_1.default.connect();
            const sqlQuery = 'DELETE FROM categories WHERE id=($1) RETURNING *';
            const result = await conn.query(sqlQuery, [id]);
            const categoryResult = result.rows[0];
            conn.release();
            return categoryResult;
        }
        catch (err) {
            throw new Error(`Could not delete product with id ${id}. Error: ${err}`);
        }
    }
    async edit(category) {
        try {
            const sqlQuery = 'UPDATE categories SET categoryname=($1) WHERE id=($2) RETURNING *';
            const conn = await connectDB_1.default.connect();
            const result = await conn.query(sqlQuery, [
                category.categoryname,
                category.id
            ]);
            const categoryResult = result.rows[0];
            conn.release();
            return categoryResult;
        }
        catch (err) {
            throw new Error(`Could not update product ${category.id})}. Error: ${err}`);
        }
    }
    async showCategoryProducts(id) {
        try {
            const conn = await connectDB_1.default.connect();
            let sqlQuery = 'SELECT * FROM categories WHERE id=($1)';
            const catResult = await conn.query(sqlQuery, [id]);
            sqlQuery =
                'SELECT id,productname,price FROM products WHERE categoryid=($1)';
            const prodResult = await conn.query(sqlQuery, [id]);
            conn.release();
            return {
                id: id,
                categoryname: catResult.rows[0].categoryname,
                products: prodResult.rows
            };
        }
        catch (err) {
            throw new Error(`Could not find product with id ${id}. Error: ${err}`);
        }
    }
}
exports.Categories = Categories;
