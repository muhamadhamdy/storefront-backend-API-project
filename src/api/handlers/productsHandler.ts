import express, { Request, Response } from 'express';
import { verifyJWT } from '../../components/authenticateUser';
import { product, Products } from '../models/productModel';

const Product = new Products();

const index = async (_req: Request, res: Response) => {
    try {
        const products = await Product.index();
        res.json(products);
    } catch (err) {
        res.json(err);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const product = await Product.show(parseInt(req.params.id));
        res.json(product);
    } catch (err) {
        res.json(err);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const newProduct: product = {
            id: 0,
            productname: req.body.productname,
            price: parseFloat(req.body.price),
            categoryid: parseInt(req.body.categoryid)
        };
        const products = await Product.create(newProduct);
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const deleted = async (req: Request, res: Response) => {
    try {
        const deleted = await Product.delete(parseInt(req.body.id));
        res.json(deleted);
    } catch (err) {
        res.json(err);
    }
};

const edit = async (req: Request, res: Response) => {
    try {
        const editProduct: product = {
            id: parseInt(req.body.id),
            productname: req.body.productname,
            price: parseFloat(req.body.price),
            categoryid: parseInt(req.body.categoryid)
        };
        const edited = await Product.edit(editProduct);
        res.json(edited);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const top5_Products = async (req: Request, res: Response) => {
    try {
        const products = await Product.top5Products();
        res.json(products);
    } catch (err) {
        res.json(err);
    }
};

const productsRoutes = (app: express.Application) => {
    app.get('/products/top5', top5_Products);
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyJWT, create);
    app.delete('/products', verifyJWT, deleted);
    app.put('/products', verifyJWT, edit);
};

export default productsRoutes;
