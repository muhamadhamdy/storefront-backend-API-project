"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticateUser_1 = require("../../components/authenticateUser");
const productModel_1 = require("../models/productModel");
const Product = new productModel_1.Products();
const index = async (_req, res) => {
    try {
        const products = await Product.index();
        res.json(products);
    }
    catch (err) {
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const product = await Product.show(parseInt(req.params.id));
        res.json(product);
    }
    catch (err) {
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const newProduct = {
            id: 0,
            productname: req.body.productname,
            price: parseFloat(req.body.price),
            categoryid: parseInt(req.body.categoryid)
        };
        const products = await Product.create(newProduct);
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const deleted = async (req, res) => {
    try {
        const deleted = await Product.delete(parseInt(req.body.id));
        res.json(deleted);
    }
    catch (err) {
        res.json(err);
    }
};
const edit = async (req, res) => {
    try {
        const editProduct = {
            id: parseInt(req.body.id),
            productname: req.body.productname,
            price: parseFloat(req.body.price),
            categoryid: parseInt(req.body.categoryid)
        };
        const edited = await Product.edit(editProduct);
        res.json(edited);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const top5_Products = async (req, res) => {
    try {
        const products = await Product.top5Products();
        res.json(products);
    }
    catch (err) {
        res.json(err);
    }
};
const productsRoutes = (app) => {
    app.get('/products/top5', top5_Products);
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', authenticateUser_1.verifyJWT, create);
    app.delete('/products', authenticateUser_1.verifyJWT, deleted);
    app.put('/products', authenticateUser_1.verifyJWT, edit);
};
exports.default = productsRoutes;
