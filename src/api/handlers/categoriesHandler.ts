import express, { Request, Response } from 'express';
import { verifyJWT } from '../../components/authenticateUser';
import { category, Categories } from '../models/categoryModel';

const Category = new Categories();

const index = async (_req: Request, res: Response) => {
    const categories = await Category.index();
    res.json(categories);
};

const show = async (req: Request, res: Response) => {
    const category = await Category.show(parseInt(req.params.id));
    res.json(category);
};

const create = async (req: Request, res: Response) => {
    try {
        const newCategory: category = {
            id: 0,
            categoryname: req.body.categoryname
        };
        const categories = await Category.create(newCategory);
        res.json(categories);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const deleted = async (req: Request, res: Response) => {
    const deleted = await Category.delete(parseInt(req.body.id));
    res.json(deleted);
};

const edit = async (req: Request, res: Response) => {
    try {
        const editCategory: category = {
            id: parseInt(req.body.id),
            categoryname: req.body.categoryname
        };
        const edited = await Category.edit(editCategory);
        res.json(edited);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const categoryProducts = async (req: Request, res: Response) => {
    const category = await Category.showCategoryProducts(
        parseInt(req.params.id)
    );
    res.json(category);
};

const categoriesRoutes = (app: express.Application) => {
    app.get('/categories', index);
    app.get('/categories/:id', show);
    app.post('/categories', verifyJWT, create);
    app.delete('/categories', verifyJWT, deleted);
    app.put('/categories', verifyJWT, edit);
    app.get('/categories/:id/products', categoryProducts);
};

export default categoriesRoutes;
