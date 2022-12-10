import client from '../../components/connectDB';

export type category = {
    id: number;
    categoryname: string;
};

type category_Product = {
    productid: number;
    productname: string;
    productprice: number;
};

export interface CategoryProducts extends category {
    products: category_Product[];
}
export class Categories {
    async index(): Promise<category[]> {
        try {
            const conn = await client.connect();
            const sqlQuery = 'SELECT * FROM categories';
            const result = await conn.query(sqlQuery);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Couldn't execute your request ${err}`);
        }
    }

    async show(id: number): Promise<category> {
        try {
            const conn = await client.connect();
            const sqlQuery = 'SELECT * FROM categories WHERE id=($1)';
            const result = await conn.query(sqlQuery, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could not find product with id ${id}. Error: ${err}`
            );
        }
    }

    async create(category: category): Promise<category> {
        try {
            const conn = await client.connect();
            const sqlQuery =
                'INSERT INTO categories (categoryname) VALUES($1) RETURNING *';
            const result = await conn.query(sqlQuery, [category.categoryname]);
            const categoryResult = result.rows[0];
            conn.release();
            return categoryResult;
        } catch (err) {
            throw new Error(
                `Could not add new category ${category.categoryname}. Error: ${err}`
            );
        }
    }

    async delete(id: number): Promise<category> {
        try {
            const conn = await client.connect();
            const sqlQuery = 'DELETE FROM categories WHERE id=($1) RETURNING *';
            const result = await conn.query(sqlQuery, [id]);
            const categoryResult: category = result.rows[0];
            conn.release();
            return categoryResult;
        } catch (err) {
            throw new Error(
                `Could not delete product with id ${id}. Error: ${err}`
            );
        }
    }

    async edit(category: category): Promise<category> {
        try {
            const sqlQuery: string =
                'UPDATE categories SET categoryname=($1) WHERE id=($2) RETURNING *';
            const conn = await client.connect();
            const result = await conn.query(sqlQuery, [
                category.categoryname,
                category.id
            ]);
            const categoryResult = result.rows[0];
            conn.release();
            return categoryResult;
        } catch (err) {
            throw new Error(
                `Could not update product ${category.id})}. Error: ${err}`
            );
        }
    }

    async showCategoryProducts(id: number): Promise<CategoryProducts> {
        try {
            const conn = await client.connect();
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
        } catch (err) {
            throw new Error(
                `Could not find product with id ${id}. Error: ${err}`
            );
        }
    }
}
