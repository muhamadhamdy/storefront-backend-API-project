import client from '../../components/connectDB';

export type product = {
    id: number;
    productname: string;
    price: number;
    categoryid: number;
};

export type top5 = {
    rank: number;
    id: number;
    productname: string;
    quantity: number;
};

export class Products {
    async index(): Promise<product[]> {
        try {
            const conn = await client.connect();
            const sqlQuery = 'SELECT * FROM products';
            const result = await conn.query(sqlQuery);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Couldn't execute your request ${err}`);
        }
    }

    async show(id: number): Promise<product> {
        try {
            const conn = await client.connect();
            const sqlQuery = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sqlQuery, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could not find product with id ${id}. Error: ${err}`
            );
        }
    }

    async create(product: product): Promise<product> {
        try {
            const conn = await client.connect();
            const sqlQuery =
                'INSERT INTO products (productname,price,categoryid) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sqlQuery, [
                product.productname,
                product.price,
                product.categoryid
            ]);
            const productResult = result.rows[0];
            conn.release();
            return productResult;
        } catch (err) {
            throw new Error(
                `Could not add new product ${product.productname}. Error: ${err}`
            );
        }
    }

    async delete(id: number): Promise<product> {
        try {
            const conn = await client.connect();
            const sqlQuery = 'DELETE FROM products WHERE id=($1) RETURNING *';
            const result = await conn.query(sqlQuery, [id]);
            const productResult: product = result.rows[0];
            conn.release();
            return productResult;
        } catch (err) {
            throw new Error(
                `Could not delete product with id ${id}. Error: ${err}`
            );
        }
    }

    async edit(product: product): Promise<product> {
        try {
            const sqlQuery: string =
                'UPDATE products SET productname=($1),price=($2),categoryid=($3) WHERE id=($4) RETURNING *';
            const conn = await client.connect();
            const result = await conn.query(sqlQuery, [
                product.productname,
                product.price,
                product.categoryid,
                product.id
            ]);
            const productResult = result.rows[0];
            conn.release();
            return productResult;
        } catch (err) {
            throw new Error(
                `Could not update product ${product.id})}. Error: ${err}`
            );
        }
    }

    async top5Products(): Promise<top5[]> {
        try {
            const conn = await client.connect();
            const sqlQuery =
                'SELECT ROW_NUMBER() OVER () as Rank, Q.* FROM (SELECT products.id, products.productname, SUM(order_products.quantity) AS orderproductnumber ' +
                ' FROM products INNER JOIN order_products ON products.id=order_products.productid' +
                ' GROUP BY products.id, products.productname ORDER BY orderproductnumber DESC) AS Q LIMIT 5';
            const result = await conn.query(sqlQuery);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Couldn't execute your request ${err}`);
        }
    }
}
