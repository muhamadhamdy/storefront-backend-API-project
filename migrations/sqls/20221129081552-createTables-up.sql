CREATE TYPE status AS ENUM('active','complete');

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    password VARCHAR
);

CREATE TABLE categories
(
    id SERIAL PRIMARY KEY,
    CategoryName VARCHAR(50) NOT NULL
);

CREATE TABLE products
(
    id SERIAL PRIMARY KEY,
    productname VARCHAR NOT NULL,
    price FLOAT CHECK(price>=0) DEFAULT 0,
    categoryid INTEGER REFERENCES categories(id)
);

CREATE TABLE orders(
id SERIAL PRIMARY KEY,
orderdate TIMESTAMP NOT NULL DEFAULT NOW(),
userid INTEGER REFERENCES users(id) NOT NULL,
orderstatus STATUS NOT NULL DEFAULT 'active'
);

CREATE TABLE order_products
(
    id SERIAL PRIMARY KEY,
    orderid INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    productid INTEGER REFERENCES products(id) NOT NULL,
    quantity INTEGER CHECK (quantity>=0) NOT NULL DEFAULT 0
);
