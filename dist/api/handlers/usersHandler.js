"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticateUser_1 = require("../../components/authenticateUser");
const userModel_1 = require("../models/userModel");
const User = new userModel_1.Users();
const index = async (_req, res) => {
    try {
        const users = await User.index();
        res.json(users);
    }
    catch (err) {
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const users = await User.show(parseInt(req.params.id));
        res.json(users);
    }
    catch (err) {
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const newUser = {
            id: 0,
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        };
        const rtnUser = await User.create(newUser);
        res.json(rtnUser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const deleted = async (req, res) => {
    try {
        const deleted = await User.delete(parseInt(req.body.id));
        res.json(deleted);
    }
    catch (err) {
        res.json(err);
    }
};
const edit = async (req, res) => {
    try {
        const editUser = {
            id: parseInt(req.body.id),
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        };
        const edited = await User.edit(editUser);
        res.json(edited);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const usersRoutes = (app) => {
    app.get('/users', authenticateUser_1.verifyJWT, index);
    app.get('/users/:id', authenticateUser_1.verifyJWT, show);
    app.post('/users', create);
    app.delete('/users', authenticateUser_1.verifyJWT, deleted);
    app.put('/users', authenticateUser_1.verifyJWT, edit);
};
exports.default = usersRoutes;
