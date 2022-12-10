import { OrderPorducts, product } from "../models/orderProductsModel";
import express, { Response,Request} from "express";
import { verifyJWT } from "../../components/authenticateUser";

const orderPorducts= new OrderPorducts;

const create = async (req: Request, res: Response) => {
    try {
        const newProduct: product = {
            id: 0,
            productid: parseInt(req.body.productid),
            orderid: parseInt(req.body.orderid),
            quantity: parseInt(req.body.quantity)
        };
        const product = await orderPorducts.insert(newProduct);
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }

}

const edit = async (req: Request, res: Response) => {
    try {
        const product = await orderPorducts.edit(parseInt(req.body.id),parseInt(req.body.quantity));
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const deleted = async (req: Request, res: Response) => {
    try {
        const product = await orderPorducts.delete(parseInt(req.body.id),parseInt(req.body.orderid));
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const orderProductsRoutes = (app: express.Application) => {
    app.post('/orders/:id/products', verifyJWT, create);
    app.delete('/orders/:id/products', verifyJWT, deleted);
    app.put('/orders/:id/products', verifyJWT, edit);
};

export default orderProductsRoutes;