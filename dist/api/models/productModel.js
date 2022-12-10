"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const connectDB_1 = __importDefault(require("../../components/connectDB"));
class Products {
    async index() {
        try {
            const conn = await connectDB_1.default.connect();
            const sqlQuery = 'SELECT * FROM products';
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
            const sqlQuery = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sqlQuery, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product with id ${id}. Error: ${err}`);
        }
    }
    async create(product) {
        try {
            const conn = await connectDB_1.default.connect();
            const sqlQuery = 'INSERT INTO products (productname,price,categoryid) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sqlQuery, [
                product.productname,
                product.price,
                product.categoryid
            ]);
            const productResult = result.rows[0];
            conn.release();
            return productResult;
        }
        catch (err) {
            throw new Error(`Could not add new product ${product.productname}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await connectDB_1.default.connect();
            const sqlQuery = 'DELETE FROM products WHERE id=($1) RETURNING *';
            const result = await conn.query(sqlQuery, [id]);
            const productResult = result.rows[0];
            conn.release();
            return productResult;
        }
        catch (err) {
            throw new Error(`Could not delete product with id ${id}. Error: ${err}`);
        }
    }
    async edit(product) {
        try {
            const sqlQuery = 'UPDATE products SET productname=($1),price=($2),categoryid=($3) WHERE id=($4) RETURNING *';
            const conn = await connectDB_1.default.connect();
            const result = await conn.query(sqlQuery, [
                product.productname,
                product.price,
                product.categoryid,
                product.id
            ]);
            const productResult = result.rows[0];
            conn.release();
            return productResult;
        }
        catch (err) {
            throw new Error(`Could not update product ${product.id})}. Error: ${err}`);
        }
    }
    async top5Products() {
        try {
            const conn = await connectDB_1.default.connect();
            const sqlQuery = 'SELECT ROW_NUMBER() OVER () as Rank, Q.* FROM (SELECT products.id, products.productname, SUM(order_products.quantity) AS orderproductnumber ' +
                ' FROM products INNER JOIN order_products ON products.id=order_products.productid' +
                ' GROUP BY products.id, products.productname ORDER BY orderproductnumber DESC) AS Q LIMIT 5';
            const result = await conn.query(sqlQuery);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Couldn't execute your request ${err}`);
        }
    }
}
exports.Products = Products;
