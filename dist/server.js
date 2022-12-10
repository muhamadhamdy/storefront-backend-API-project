"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const usersHandler_1 = __importDefault(require("./api/handlers/usersHandler"));
const signHandler_1 = __importDefault(require("./api/handlers/signHandler"));
const productsHandler_1 = __importDefault(require("./api/handlers/productsHandler"));
const categoriesHandler_1 = __importDefault(require("./api/handlers/categoriesHandler"));
const ordersHandler_1 = __importDefault(require("./api/handlers/ordersHandler"));
const orderProductHandler_1 = __importDefault(require("./api/handlers/orderProductHandler"));
const app = (0, express_1.default)();
const address = '127.0.0.1:3000';
const corsOptions = { optionsSuccessStatus: 200 };
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
(0, signHandler_1.default)(app);
(0, usersHandler_1.default)(app);
(0, productsHandler_1.default)(app);
(0, categoriesHandler_1.default)(app);
(0, ordersHandler_1.default)(app);
(0, orderProductHandler_1.default)(app);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
