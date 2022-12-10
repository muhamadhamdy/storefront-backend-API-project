import { createJWT, getHash } from '../../components/authenticateUser';
import client from '../../components/connectDB';
import bcrypt from 'bcrypt';

export type user = {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
};

export type passwords = {
    username: string;
    oldPassword: string;
    newPassword: string;
};

export interface authUser extends user {
    authenticationToken: string;
}

export class Users {
    async index(): Promise<user[]> {
        try {
            const conn = await client.connect();
            const sqlQuery = 'select * from users';
            const result = await conn.query(sqlQuery);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Couldn't execute your request ${err}`);
        }
    }

    async show(id: number): Promise<user> {
        try {
            const conn = await client.connect();
            const sqlQuery = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sqlQuery, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }

    async create(user: user): Promise<user> {
        try {
            const conn = await client.connect();
            // check if user exists
            const username = await conn.query(
                'SELECT id FROM users WHERE username=($1)',
                [user.username.toLowerCase()]
            );

            if (username.rows.length) {
                throw new Error(
                    ` A user with the username ${user.username} already exists.`
                );
            }
            const sqlQuery =
                'INSERT INTO users (firstname,lastname,username,password) VALUES($1, $2, $3,$4) RETURNING *';
            const result = await conn.query(sqlQuery, [
                user.firstname,
                user.lastname,
                user.username.toLowerCase(),
                getHash(user.password)
            ]);
            const userResult = result.rows[0];
            conn.release();
            return userResult;
        } catch (err) {
            throw new Error(
                `Could not add new user ${user.lastname.concat(
                    ' , ',
                    user.lastname
                )}. Error: ${err}`
            );
        }
    }

    async delete(id: number): Promise<user> {
        try {
            const conn = await client.connect();
            const sqlQuery = 'DELETE FROM users WHERE id=($1) RETURNING *';
            const result = await conn.query(sqlQuery, [id]);
            const userResult: user = result.rows[0];
            conn.release();
            return userResult;
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }

    async edit(user: user): Promise<user> {
        try {
            let newPassword: string = '';
            let sqlQuery: string = '';
            let paramArr: (number | string)[];
            const conn = await client.connect();
            if (
                !user.password ||
                user.password.toLowerCase() === 'old' ||
                user.password === ''
            ) {
                sqlQuery =
                    'UPDATE users SET firstname=($1),lastname=($2) WHERE id=($3) RETURNING *';
                paramArr = [user.firstname, user.lastname, user.id];
            } else {
                sqlQuery =
                    'UPDATE users SET firstname=($1),lastname=($2),password=($3) WHERE id=($4) RETURNING *';
                newPassword = getHash(user.password);
                paramArr = [
                    user.firstname,
                    user.lastname,
                    newPassword,
                    user.id
                ];
            }
            const result = await conn.query(sqlQuery, paramArr);
            const userResult = result.rows[0];
            conn.release();
            return userResult;
        } catch (err) {
            throw new Error(
                `Could not update user ${user.id})}. Error: ${err}`
            );
        }
    }

    async signIn(username: string, password: string): Promise<authUser | null> {
        try {
            const ext = process.env.BCRYPT_PASSWORD;
            const conn = await client.connect();
            const sqlQuery = 'SELECT * FROM users WHERE username=($1)';
            const signInResult = await conn.query(sqlQuery, [
                username.toLowerCase()
            ]);
            conn.release;
            if (signInResult.rows.length) {
                const user = signInResult.rows[0];
                if (bcrypt.compareSync(password + ext, user.password)) {
                    const rtnResult = {
                        id: user.id,
                        username: user.username,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        password: user.password,
                        authenticationToken: createJWT(user)
                    };
                    return rtnResult;
                }
            }
        } catch (err) {
            throw new Error(`couldn't authenticate user : \n ${err}`);
        }
        return null;
    }
}
