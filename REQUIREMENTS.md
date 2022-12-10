# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index route `/products` [GET] 
- Show route `/products/:id` [GET] 
- Create route `/products` [POST] [token required]
- Edit route `/products` [PUT] [token required]
- Delete route `/products` [DELETE] [token required]
- Top 5 products route `/products/top5` [GET] 

#### Categories
- Index route `/categories` [GET] 
- Show route `/categories/:id` [GET] 
- Create route `/categories` [POST] [token required]
- Edit route `/categories` [PUT] [token required]
- Delete route `/categories` [DELETE] [token required]
- Products by category route `/categories/:id/products` [GET] 

#### Users
- Index route `/users` [GET] [token required]
- Show route `/users/:id` [GET] [token required]
- Create route `/users` [POST] [token required]
- Edit route `/users` [PUT] [token required]
- Delete route `/users` [DELETE] [token required]
- SignIn route `/users/signin` [GET]
- SignUp route `/users/signup` [GET]

#### Orders    ````(actions only for logged user orders)````
- Index route `/orders` [GET] [token required]   
- Show route `/orders/:id` [GET] [token required]
- Create route `/orders` [POST] [token required] send a JSON objext in body {id:0, userid: looged user id,date: current date, orderstatus: status of order (active or complete)  ,products:[ array of Order_Products] }
- Edit route `/orders` [PUT] [token required] send a JSON objext in body {id:order id, userid: looged user id,date: current date, orderstatus: status of order (active or complete) } 
    **NOTE:** edit only of order header data, to etit, delete or add new products to existing order user relevent routes.
- Delete route `/orders` [DELETE] [token required] send a JSON objext in body {id:order id}
- Active orders `/orders/active` [GET] [token required]
- Complete orders `/orders/complete` [GET] [token required]
- Current Order `/orders/current`  [token required]
- Add new product to existing order `/orders/:id/products` [POST] [token required]
- Edit product of existing order `/orders/:id/products` [PUT] [token required]
- Delete product of existing order `/orders/:id/products` [DELETE] [token required]

## Data Shapes
    Send data to API in JSON format with folowing structure.
    In case of adding a new record send id with 0.
    In case of update send all data updated or not.
    In case of user update if password not changed send 'old' in password field.

#### Products
- id: NUMBER 
- productname: STRING
- price: NUMBER
- categoryid: NUMBER [foreign key to categories table]

#### Categories
-  id: NUMBER 
- categoryname: STRING

#### Users
- id: NUMBER
- username: STRING
- firstName: STRING
- lastName: STRING
- password: STRING

#### Orders
- id: NUMBER
- user_id: NUMBER [foreign key to users table]
- orderstatus: STRING [one of these words in lower case (active or complete)]

#### Order_Products
- id: NUMBER [serial primary key]
- orderid: NUMBER[foreign key to orders table]
- productid: NUMBER [foreign key to products table]
- quantity: NUMBER



#### DATABASE
    - storefront_dev

#### TABLES
#### Products
-  id: integer [serial primary key]
- productname: VARCHAR
- price: FLOAT
- categoryid: integer [foreign key to categories table]
- TABLE products (id: SERIAL PRIMARY KEY, productname: VARCHAR NOT NULL, price: FLOAT CHECK(price>=0) DEFAULT 0, 
                categoryid: INTEGER REFERENCES categories(id))

#### Categories
-  id: integer [serial primary key]
- categoryname: VARCHAR
- TABLE categories (id: SERIAL PRIMARY KEY, CategoryName: VARCHAR(50) NOT NULL)

#### Users
- id: [serial primary key]
- username: VARCHAR
- firstName: VARCHAR
- lastName: VARCHAR
- password: VARCHAR
- TABLE users (id: SERIAL PRIMARY KEY, username: VARCHAR(50) NOT NULL, firstname: VARCHAR(50) NOT NULL, 
                lastname: VARCHAR(50) NOT NULL, password: VARCHAR)
#### Orders
- id: [serial primary key]
- user_id: [foreign key to users table]
- orderstatus: STATUS ENUM (active or complete)
- TABLE orders (id: SERIAL PRIMARY KEY, orderdate: TIMESTAMP NOT NULL DEFAULT NOW(), userid: INTEGER REFERENCES users(id) NOT NULL,
                orderstatus STATUS NOT NULL DEFAULT 'active')
#### Order_Products

- id [serial primary key]
- orderid: [foreign key to orders table]
- productid: [foreign key to products table]
- quantity: integer
- TABLE order_products (id: SERIAL PRIMARY KEY, orderid: INTEGER NOT NULL, productid INTEGER REFERENCES products(id) NOT NULL,
                quantity INTEGER CHECK (quantity>=0) NOT NULL DEFAULT 0)