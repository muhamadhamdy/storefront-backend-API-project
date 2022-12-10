"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromToken = exports.verifyUser = exports.getUserIDFromToken = exports.verifySameUser = exports.verifyJWT = exports.createJWT = exports.authenticate = exports.getHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const connectDB_1 = __importDefault(require("./connectDB"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getHash = (str) => {
    const ext = process.env.BCRYPT_PASSWORD;
    const rounds = process.env.SALT_ROUNDS || '10';
    return bcrypt_1.default.hashSync(str + ext, parseInt(rounds));
};
exports.getHash = getHash;
const authenticate = async (username, password) => {
    const ext = process.env.BCRYPT_PASSWORD;
    try {
        const conn = await connectDB_1.default.connect();
        const sqlQuery = 'SELECT password FROM users WHERE username=($1)';
        const result = await conn.query(sqlQuery, [username]);
        conn.release();
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(password + ext, user.password)) {
                return user;
            }
        }
    }
    catch (err) {
        throw new Error(`couldn't authenticate user`);
    }
    return null;
};
exports.authenticate = authenticate;
const createJWT = (user) => {
    const secret = process.env.BCRYPT_PASSWORD || '';
    const token = jsonwebtoken_1.default.sign({ user: user }, secret);
    return token;
};
exports.createJWT = createJWT;
const verifyJWT = (req, res, next) => {
    const secret = process.env.BCRYPT_PASSWORD || '';
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1] || '';
        jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
    }
};
exports.verifyJWT = verifyJWT;
const verifySameUser = (req, res, next) => {
    //  still building up
    try {
        next();
    }
    catch (err) {
        res.status(401);
        res.json('logged user not the order owner');
    }
};
exports.verifySameUser = verifySameUser;
const getUserIDFromToken = (req) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1] || '';
        return (0, exports.getUserFromToken)(token)?.id || null;
    }
    catch {
        return null;
    }
};
exports.getUserIDFromToken = getUserIDFromToken;
const verifyUser = (req, usderID) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1] || '';
        return (0, exports.getUserFromToken)(token)?.id === usderID;
    }
    catch {
        return false;
    }
};
exports.verifyUser = verifyUser;
const getUserFromToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.decode(token);
        const res = Object(decoded);
        return res.user;
    }
    catch {
        return null;
    }
};
exports.getUserFromToken = getUserFromToken;
