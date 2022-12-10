CREATE TABLE order_products
(
    id SERIAL PRIMARY KEY,
    orderid INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    productid INTEGER REFERENCES products(id) NOT NULL,
    quantity INTEGER CHECK (quantity>=0) NOT NULL DEFAULT 0
);