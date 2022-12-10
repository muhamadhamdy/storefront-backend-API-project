import client from "../../components/connectDB";

export type product = {
    id: number;
    orderid: number;
    productid: number;
    //productname: string;
    //unitprice: number;
    quantity: number;
};


export class OrderPorducts{

    async insert (product:product):Promise<product>{
        try {
            const conn = await client.connect();
            const sqlQuery =
                'INSERT INTO order_products (orderid,productid,quantity) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sqlQuery, [
                product.orderid,
                product.productid,
                product.quantity
            ]);
            const productResult = result.rows[0];
            conn.release();
            return productResult;
        } catch (err) {
            throw new Error(
                `Could not add new product ${product.id} to order number ${product.orderid} \n Error: ${err}`
            );
        }
    }
    async edit (id:number, quantity:number):Promise<product>{
        try {
            const sqlQuery: string =
                'UPDATE order_products SET quantity=($1) WHERE id=($2) RETURNING *';
            const conn = await client.connect();
            const result = await conn.query(sqlQuery, [quantity,id]);
            const productResult = result.rows[0];
            conn.release();
            return productResult;
        } catch (err) {
            throw new Error(
                `Could not update product ${id} Error: ${err}`
            );
        }

    }    
    async delete (productid:number, orderid:number):Promise<product>{
        try {
            const conn = await client.connect();
            const sqlQuery = 'DELETE FROM order_products WHERE productid=($1) AND orderid=($2) RETURNING *';
            const result = await conn.query(sqlQuery, [productid,orderid]);
            const productResult: product = result.rows[0];
            conn.release();
            return productResult;
        } catch (err) {
            throw new Error(
                `Could not delete product with id ${productid} in order number ${orderid}\n Error: ${err}`
            );
        }
    }

}