import express, { Request, Response } from 'express';
import {
    authenticate,
    createJWT,
    verifyJWT
} from '../../components/authenticateUser';
import { authUser, user, Users } from '../models/userModel';

const User = new Users();

const index = async (_req: Request, res: Response) => {
    const users = await User.index();
    res.json(users);
};

const show = async (req: Request, res: Response) => {
    const users = await User.show(parseInt(req.params.id));
    res.json(users);
};

const create = async (req: Request, res: Response) => {
    try {
        const newUser: user = {
            id: 0,
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        };
        const rtnUser = await User.create(newUser);
        // const result= {
        //     id: rtnUser.id,
        //     username: rtnUser.username,
        //     firstname: rtnUser.firstname,
        //     lastname: rtnUser.lastname,
        //     password: rtnUser.password,
        //     authenticationToken: createJWT(rtnUser)
        //};
        res.json(rtnUser);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const deleted = async (req: Request, res: Response) => {
    const deleted = await User.delete(parseInt(req.body.id));
    res.json(deleted);
};

const edit = async (req: Request, res: Response) => {
    try {
        const editUser: user = {
            id: parseInt(req.body.id),
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        };
        const edited = await User.edit(editUser);
        res.json(edited);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const usersRoutes = (app: express.Application) => {
    app.get('/users', verifyJWT, index);
    app.get('/users/:id', verifyJWT, show);
    app.post('/users', create);
    app.delete('/users', verifyJWT, deleted);
    app.put('/users', verifyJWT, edit);
};

export default usersRoutes;
