
CREATE TABLE products
(
    id SERIAL PRIMARY KEY,
    productname VARCHAR NOT NULL,
    price FLOAT CHECK(price>=0) DEFAULT 0,
    categoryid INTEGER REFERENCES categories(id)
);