import express, { Request, Response } from 'express';
import {
    getUserIDFromToken,
    verifyJWT
} from '../../components/authenticateUser';
import { order, Orders, OrderWithPorducts } from '../models/orderModel';

const order = new Orders();

const index = async (req: Request, res: Response) => {
    try {
        const userid = getUserIDFromToken(req);
        if (userid) {
            const orders = await order.index(userid);
            res.json(orders);
        }
    } catch (err) {
        res.json(err);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const userid = getUserIDFromToken(req);
        if (userid) {
            const myOrder = await order.show(parseInt(req.params.id), userid);
            res.json(myOrder);
        }
    } catch (err) {
        res.json(err);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const userid = getUserIDFromToken(req);
        const newOrder: OrderWithPorducts = {
            id: 0,
            orderdate: new Date(),
            userid: userid ? userid : 0,
            status: req.body.status,
            products: req.body.products
        };
        const created = await order.create(newOrder);
        res.json(created);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const deleted = async (req: Request, res: Response) => {
    try {
        const userid = getUserIDFromToken(req);
        if (userid) {
            const deleted = await order.delete(parseInt(req.body.id), userid);
            res.json(deleted);
        }
    } catch (err) {
        res.json(err);
    }
};

const edit = async (req: Request, res: Response) => {
    try {
        const userid = getUserIDFromToken(req);
        if (userid) {
            const editOrder: order = {
                id: parseInt(req.body.id),
                userid: parseInt(req.body.userid),
                orderdate: new Date(),
                status: req.body.status
            };
            const edited = await order.edit(editOrder, userid);
            res.json(edited);
        }
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const orderStatusActive = async (req: Request, res: Response) => {
    try {
        const userid = getUserIDFromToken(req);
        if (userid) {
            const orders = await order.orderStatus('active', userid);
            res.json(orders);
        }
    } catch (err) {
        res.json(err);
    }
};

const orderStatusComplete = async (req: Request, res: Response) => {
    try {
        const userid = getUserIDFromToken(req);
        if (userid) {
            const orders = await order.orderStatus('complete', userid);
            res.json(orders);
        }
    } catch (err) {
        res.json(err);
    }
};
const ordersRoutes = (app: express.Application) => {
    app.get('/orders/active', verifyJWT, orderStatusActive);
    app.get('/orders/complete', verifyJWT, orderStatusComplete);
    app.get('/orders', verifyJWT, index);
    app.get('/orders', verifyJWT, index);
    app.get('/orders/:id', verifyJWT, show);
    app.post('/orders', verifyJWT, create);
    app.delete('/orders', verifyJWT, deleted);
    app.put('/orders', verifyJWT, edit);
};

export default ordersRoutes;
