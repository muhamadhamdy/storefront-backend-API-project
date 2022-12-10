"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orderProductsModel_1 = require("../models/orderProductsModel");
const authenticateUser_1 = require("../../components/authenticateUser");
const orderPorducts = new orderProductsModel_1.OrderPorducts;
const create = async (req, res) => {
    try {
        const newProduct = {
            id: 0,
            productid: parseInt(req.body.productid),
            orderid: parseInt(req.body.orderid),
            quantity: parseInt(req.body.quantity)
        };
        const product = await orderPorducts.insert(newProduct);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const edit = async (req, res) => {
    try {
        const product = await orderPorducts.edit(parseInt(req.body.id), parseInt(req.body.quantity));
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const deleted = async (req, res) => {
    try {
        const product = await orderPorducts.delete(parseInt(req.body.id), parseInt(req.body.orderid));
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const orderProductsRoutes = (app) => {
    app.post('/orders/:id/products', authenticateUser_1.verifyJWT, create);
    app.delete('/orders/:id/products', authenticateUser_1.verifyJWT, deleted);
    app.put('/orders/:id/products', authenticateUser_1.verifyJWT, edit);
};
exports.default = orderProductsRoutes;
