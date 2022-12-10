import { query, request, response } from 'express';
import { Query, QueryResult } from 'pg';
import { getUserIDFromToken } from '../../components/authenticateUser';
import client from '../../components/connectDB';
import { Products } from './productModel';

// export enum status {
//     'active',
//     'complete'
// }
export type order = {
    id: number;
    orderdate: Date;
    userid: number;
    status: string;
};

export type Product = {
    id: number;
    productid: number;
    productname: string;
    unitprice: number;
    quantity: number;
};
export interface OrderWithPorducts extends order {
    products: Product[];
}

export class Orders {
    async index(userid: number): Promise<OrderWithPorducts[]|null> {
        try {
            let result: OrderWithPorducts[] = [];
            const conn = await client.connect();
            let sqlQuery = 'SELECT * FROM orders WHERE userid=($1)';
            const orderResult = await conn.query(sqlQuery, [userid]);
            sqlQuery =
                'SELECT OP.*, products.productname, products.price FROM order_Products AS OP INNER JOIN products ON OP.productid=products.id WHERE OP.orderid=($1)';
            let prodResult: QueryResult;
            for (let row = 0; row < orderResult.rows.length; row++) {
                prodResult = await conn.query(sqlQuery, [
                    orderResult.rows[row].id
                ]);
                result.push({
                    id: orderResult.rows[row].id,
                    orderdate: orderResult.rows[row].orderdate,
                    userid: orderResult.rows[row].userid,
                    status: orderResult.rows[row].orderstatus,
                    products: prodResult.rows
                });
            }
            conn.release();
            return result;
        } catch (err) {
            throw new Error(`Couldn't execute your request ${err}`);
        }
    }

    async show(id: number, userid: number): Promise<OrderWithPorducts|null> {
        try {
            const conn = await client.connect();
            let sqlQuery = 'SELECT * FROM orders WHERE id=($1) AND userid=($2)';
            const orderResult = await conn.query(sqlQuery, [id, userid]);
             if (!orderResult.rows.length) {
                return null;
            }
            sqlQuery =
                'SELECT OP.*, products.productname, products.price FROM order_Products AS OP INNER JOIN products ON OP.productid=products.id WHERE OP.orderid=($1)';
            const prodResult= await conn.query(sqlQuery, [
                    orderResult.rows[0].id
                ]); 
            conn.release();
            return {
                id: orderResult.rows[0].id,
                orderdate: orderResult.rows[0].orderdate,
                userid: orderResult.rows[0].userid,
                status: orderResult.rows[0].orderstatus,
                products: prodResult.rows
            };
        } catch (err) {
            throw new Error(
                `Could not find order with id ${id}. Error: ${err}`
            );
        }
    }

    async create(order: OrderWithPorducts): Promise<OrderWithPorducts|null> {
        try {
            let products: Product[] = [];
            const conn = await client.connect();
            let sqlQuery =
                'INSERT INTO orders (userid) VALUES($1) RETURNING *';
            const orderResult = await conn.query(sqlQuery, [order.userid]);
            let prodResult: QueryResult;
            if (orderResult.rows.length) {
                sqlQuery = 'INSERT INTO order_products(orderid,productid,quantity) VALUES($1,$2,$3) RETURNING *';
                for (let row = 0; row < order.products.length; row++) {
                    prodResult = await conn.query(sqlQuery,
                        [orderResult.rows[0].id, order.products[row].productid, order.products[row].quantity]);
                    products.push(prodResult.rows[0]);
                }
            }
            const result = {
                id: orderResult.rows[0].id,
                orderdate: orderResult.rows[0].orderdate,
                userid: orderResult.rows[0].userid,
                status: orderResult.rows[0].orderstatus,
                products: products
            }
            conn.release();
            return result;
        } catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`);
        }
    }

    async delete(id: number, userid: number): Promise<OrderWithPorducts|null> {
        try {
            const conn = await client.connect();
            let sqlQuery =
                'SELECT OP.*, products.productname, products.price FROM order_Products AS OP INNER JOIN products ON OP.productid=products.id WHERE OP.orderid=($1)';
            const prodResult = await conn.query(sqlQuery, [id]); 
            sqlQuery = 'DELETE FROM orders WHERE id=($1) AND userid=($2) RETURNING *';
            const orderResult = await conn.query(sqlQuery, [id, userid]);
            
            const result: OrderWithPorducts = {
                id: orderResult.rows[0].id,
                orderdate: orderResult.rows[0].orderdate,
                userid: orderResult.rows[0].userid,
                status: orderResult.rows[0].orderstatus,
                products: prodResult.rows
            }
            conn.release();
            return result;
        } catch (err) {
            throw new Error(
                `Could not delete order with id ${id}. Error: ${err}`
            );
        }
    }

    async edit(order: order, userid: number): Promise<OrderWithPorducts|null> {
        try {
            let sqlQuery: string =
                'UPDATE orders SET orderstatus=($1) WHERE id=($2) and userid=($3) RETURNING *';
            const conn = await client.connect();
            const orderResult = await conn.query(sqlQuery, [
                order.status,
                order.id,
                userid
            ]);
            sqlQuery =
                'SELECT OP.*, products.productname, products.price FROM order_Products AS OP INNER JOIN products ON OP.productid=products.id WHERE OP.orderid=($1)';
            const prodResult = await conn.query(sqlQuery, [orderResult.rows[0].id]);
            const result: OrderWithPorducts = {
                id: orderResult.rows[0].id,
                orderdate: orderResult.rows[0].orderdate,
                userid: orderResult.rows[0].userid,
                status: orderResult.rows[0].orderstatus,
                products: prodResult.rows
            }
            conn.release();
            return result;
        } catch (err) {
            throw new Error(
                `Could not update order ${order.id}. Error: ${err}`
            );
        }
    }

    async orderStatus(
        status: string,
        userid: number
    ): Promise<OrderWithPorducts[]|null> {
        try {
            let result: OrderWithPorducts[] = [];
            const conn = await client.connect();
            let sqlQuery =
                'SELECT * FROM orders WHERE orderstatus=($1) AND userid=($2)';
            const orderResult = await conn.query(sqlQuery, [status, userid]);
            sqlQuery =
                'SELECT OP.*, products.productname, products.price FROM order_Products AS OP INNER JOIN products ON OP.productid=products.id WHERE OP.orderid=($1)';
            let prodResult: QueryResult;
            for (let row = 0; row < orderResult.rows.length; row++) {
                prodResult = await conn.query(sqlQuery, [
                    orderResult.rows[row].id
                ]);
                result.push({
                    id: orderResult.rows[row].id,
                    orderdate: orderResult.rows[row].orderdate,
                    userid: orderResult.rows[row].userid,
                    status: orderResult.rows[row].orderstatus,
                    products: prodResult.rows
                });
            }
            conn.release();
            return result;
        } catch (err) {
            throw new Error(`Couldn't execute your request ${err}`);
        }
    }

    async currentOrder(
        status: string,
        userid: number
    ): Promise<OrderWithPorducts|null> {
        try {
            const conn = await client.connect();
            let sqlQuery =
                'SELECT * FROM orders WHERE orderstatus=($1) AND userid=($2) ORDER BY orderdate DESC LIMIT 1';
            const orderResult = await conn.query(sqlQuery, [status, userid]);
            sqlQuery =
                'SELECT OP.*, products.productname, products.price FROM order_Products AS OP INNER JOIN products ON OP.productid=products.id WHERE OP.orderid=($1)';
            const prodResult = await conn.query(sqlQuery, [
                orderResult.rows[0].id
            ]);
            conn.release();
            return {
                id: orderResult.rows[0].id,
                orderdate: orderResult.rows[0].orderdate,
                userid: orderResult.rows[0].userid,
                status: orderResult.rows[0].orderstatus,
                products: prodResult.rows
            };
        } catch (err) {
            throw new Error(`Couldn't execute your request ${err}`);
        }
    }
}
