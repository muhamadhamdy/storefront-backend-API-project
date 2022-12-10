"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../models/userModel");
const User = new userModel_1.Users();
const signIn = async (req, res) => {
    if (req.body.username && req.body.password) {
        const result = await User.signIn(req.body.username, req.body.password);
        if (!result) {
            res.status(401).json('invalid username or password');
        }
        else {
            res.json(result);
        }
    }
    else {
        res.status(401).json('invalid username or password');
    }
};
const signUp = async (req, res) => {
    try {
        const newUser = {
            id: 0,
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        };
        const rtnUser = await User.create(newUser);
        if (rtnUser) {
            const result = await User.signIn(newUser.username, newUser.password);
            if (result) {
                res.json(result);
            }
            else {
                res.status(401).json('invalid username or password');
            }
        }
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const signInRoutes = (app) => {
    app.get('/users/signin', signIn);
    app.get('/users/signup', signUp);
};
exports.default = signInRoutes;
