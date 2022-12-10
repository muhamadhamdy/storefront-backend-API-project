"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderPorducts = void 0;
const connectDB_1 = __importDefault(require("../../components/connectDB"));
class OrderPorducts {
    async insert(product) {
        try {
            const conn = await connectDB_1.default.connect();
            const sqlQuery = 'INSERT INTO order_products (orderid,productid,quantity) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sqlQuery, [
                product.orderid,
                product.productid,
                product.quantity
            ]);
            const productResult = result.rows[0];
            conn.release();
            return productResult;
        }
        catch (err) {
            throw new Error(`Could not add new product ${product.id} to order number ${product.orderid} \n Error: ${err}`);
        }
    }
    async edit(id, quantity) {
        try {
            const sqlQuery = 'UPDATE order_products SET quantity=($1) WHERE id=($2) RETURNING *';
            const conn = await connectDB_1.default.connect();
            const result = await conn.query(sqlQuery, [quantity, id]);
            const productResult = result.rows[0];
            conn.release();
            return productResult;
        }
        catch (err) {
            throw new Error(`Could not update product ${id} Error: ${err}`);
        }
    }
    async delete(productid, orderid) {
        try {
            const conn = await connectDB_1.default.connect();
            const sqlQuery = 'DELETE FROM order_products WHERE productid=($1) AND orderid=($2) RETURNING *';
            const result = await conn.query(sqlQuery, [productid, orderid]);
            const productResult = result.rows[0];
            conn.release();
            return productResult;
        }
        catch (err) {
            throw new Error(`Could not delete product with id ${productid} in order number ${orderid}\n Error: ${err}`);
        }
    }
}
exports.OrderPorducts = OrderPorducts;
