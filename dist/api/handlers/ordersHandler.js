"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticateUser_1 = require("../../components/authenticateUser");
const orderModel_1 = require("../models/orderModel");
const order = new orderModel_1.Orders();
const index = async (req, res) => {
    try {
        const userid = (0, authenticateUser_1.getUserIDFromToken)(req);
        if (userid) {
            const orders = await order.index(userid);
            res.json(orders);
        }
    }
    catch (err) {
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const userid = (0, authenticateUser_1.getUserIDFromToken)(req);
        if (userid) {
            const myOrder = await order.show(parseInt(req.params.id), userid);
            res.json(myOrder);
        }
    }
    catch (err) {
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const userid = (0, authenticateUser_1.getUserIDFromToken)(req);
        const newOrder = {
            id: 0,
            orderdate: new Date(),
            userid: userid ? userid : 0,
            status: req.body.status,
            products: req.body.products
        };
        const created = await order.create(newOrder);
        res.json(created);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const deleted = async (req, res) => {
    try {
        const userid = (0, authenticateUser_1.getUserIDFromToken)(req);
        if (userid) {
            const deleted = await order.delete(parseInt(req.body.id), userid);
            res.json(deleted);
        }
    }
    catch (err) {
        res.json(err);
    }
};
const edit = async (req, res) => {
    try {
        const userid = (0, authenticateUser_1.getUserIDFromToken)(req);
        if (userid) {
            const editOrder = {
                id: parseInt(req.body.id),
                userid: parseInt(req.body.userid),
                orderdate: new Date(),
                status: req.body.status
            };
            const edited = await order.edit(editOrder, userid);
            res.json(edited);
        }
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const orderStatusActive = async (req, res) => {
    try {
        const userid = (0, authenticateUser_1.getUserIDFromToken)(req);
        if (userid) {
            const orders = await order.orderStatus('active', userid);
            res.json(orders);
        }
    }
    catch (err) {
        res.json(err);
    }
};
const orderStatusComplete = async (req, res) => {
    try {
        const userid = (0, authenticateUser_1.getUserIDFromToken)(req);
        if (userid) {
            const orders = await order.orderStatus('complete', userid);
            res.json(orders);
        }
    }
    catch (err) {
        res.json(err);
    }
};
const ordersRoutes = (app) => {
    app.get('/orders/active', authenticateUser_1.verifyJWT, orderStatusActive);
    app.get('/orders/complete', authenticateUser_1.verifyJWT, orderStatusComplete);
    app.get('/orders', authenticateUser_1.verifyJWT, index);
    app.get('/orders', authenticateUser_1.verifyJWT, index);
    app.get('/orders/:id', authenticateUser_1.verifyJWT, show);
    app.post('/orders', authenticateUser_1.verifyJWT, create);
    app.delete('/orders', authenticateUser_1.verifyJWT, deleted);
    app.put('/orders', authenticateUser_1.verifyJWT, edit);
};
exports.default = ordersRoutes;
