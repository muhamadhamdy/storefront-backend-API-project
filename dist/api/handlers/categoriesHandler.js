"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticateUser_1 = require("../../components/authenticateUser");
const categoryModel_1 = require("../models/categoryModel");
const Category = new categoryModel_1.Categories();
const index = async (_req, res) => {
    try {
        const categories = await Category.index();
        res.json(categories);
    }
    catch (err) {
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const category = await Category.show(parseInt(req.params.id));
        res.json(category);
    }
    catch (err) {
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const newCategory = {
            id: 0,
            categoryname: req.body.categoryname
        };
        const categories = await Category.create(newCategory);
        res.json(categories);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const deleted = async (req, res) => {
    try {
        const deleted = await Category.delete(parseInt(req.body.id));
        res.json(deleted);
    }
    catch (err) {
        res.json(err);
    }
};
const edit = async (req, res) => {
    try {
        const editCategory = {
            id: parseInt(req.body.id),
            categoryname: req.body.categoryname
        };
        const edited = await Category.edit(editCategory);
        res.json(edited);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const categoryProducts = async (req, res) => {
    try {
        const category = await Category.showCategoryProducts(parseInt(req.params.id));
        res.json(category);
    }
    catch (err) {
        res.json(err);
    }
};
const categoriesRoutes = (app) => {
    app.get('/categories', index);
    app.get('/categories/:id', show);
    app.post('/categories', authenticateUser_1.verifyJWT, create);
    app.delete('/categories', authenticateUser_1.verifyJWT, deleted);
    app.put('/categories', authenticateUser_1.verifyJWT, edit);
    app.get('/categories/:id/products', categoryProducts);
};
exports.default = categoriesRoutes;
