import express, { Request, Response } from 'express';
import {
    authenticate,
    createJWT,
    verifyJWT
} from '../../components/authenticateUser';
import { authUser, user, Users } from '../models/userModel';

const User = new Users();

const signIn = async (req: Request, res: Response) => {
    if (req.body.username && req.body.password) {
        const result = await User.signIn(req.body.username, req.body.password);
        if (!result) {
            res.status(401).json('invalid username or password');
        } else {
            res.json(result);
        }
    } else {
        res.status(401).json('invalid username or password');
    }
};

const signUp = async (req: Request, res: Response) => {
    try {
        const newUser: user = {
            id: 0,
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        };
        const rtnUser = await User.create(newUser);
        if (rtnUser) {
            const result = await User.signIn(
                newUser.username,
                newUser.password
            );
            if (result) {
                res.json(result);
            } else {
                res.status(401).json('invalid username or password');
            }
        }
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const signInRoutes = (app: express.Application) => {
    app.get('/users/signin', signIn);
    app.get('/users/signup', signUp);
};

export default signInRoutes;
