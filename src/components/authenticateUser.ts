import bcrypt from 'bcrypt';
import client from './connectDB';
import { user } from '../api/models/userModel';
import jwt from 'jsonwebtoken';
import { request, Request, Response } from 'express';

export const getHash = (str: string): string => {
    const ext = process.env.BCRYPT_PASSWORD;
    const rounds = process.env.SALT_ROUNDS || '10';
    return bcrypt.hashSync(str + ext, parseInt(rounds));
};

export const authenticate = async (
    username: string,
    password: string
): Promise<user | null> => {
    const ext = process.env.BCRYPT_PASSWORD;
    try {
        const conn = await client.connect();
        const sqlQuery = 'SELECT password FROM users WHERE username=($1)';
        const result = await conn.query(sqlQuery, [username]);
        conn.release();
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt.compareSync(password + ext, user.password)) {
                return user;
            }
        }
    } catch (err) {
        throw new Error(`couldn't authenticate user`);
    }

    return null;
};

export const createJWT = (user: user): string => {
    const secret = process.env.BCRYPT_PASSWORD || '';
    const token = jwt.sign({ user: user }, secret);
    return token;
};

export const verifyJWT = (req: Request, res: Response, next: () => void) => {
    const secret = process.env.BCRYPT_PASSWORD || '';
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1] || '';
        jwt.verify(token, secret);
        next();
    } catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
    }
};

export const verifySameUser = (
    req: Request,
    res: Response,
    next: () => void
) => {
    //  still building up
    try {
        next();
    } catch (err) {
        res.status(401);
        res.json('logged user not the order owner');
    }
};

export const getUserIDFromToken = (req: Request): number | null => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1] || '';
        return getUserFromToken(token)?.id || null;
    } catch {
        return null;
    }
};

export const verifyUser = (req: Request, usderID: number): boolean => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1] || '';
        return getUserFromToken(token)?.id === usderID;
    } catch {
        return false;
    }
};

export const getUserFromToken = (token: string): user | null => {
    try {
        const decoded = jwt.decode(token);
        const res = Object(decoded);
        return res.user;
    } catch {
        return null;
    }
};
