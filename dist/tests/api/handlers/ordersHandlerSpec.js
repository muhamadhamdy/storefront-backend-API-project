"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const categoryModel_1 = require("../../../api/models/categoryModel");
const productModel_1 = require("../../../api/models/productModel");
const userModel_1 = require("../../../api/models/userModel");
const server_1 = __importDefault(require("../../../server"));
const test = (0, supertest_1.default)(server_1.default);
let userid = 0;
let categoryid = 0;
let productid = 0;
let orderid = 1;
describe('* Orders API endpoints testing.', () => {
    beforeAll(async () => {
        // Create required user,product and category for testing
        const catResult = await new categoryModel_1.Categories().create({
            id: 0,
            categoryname: 'OrderAPITestCategory',
        });
        categoryid = catResult.id;
        const prodResult = await new productModel_1.Products().create({
            id: 0,
            productname: 'OrderAPITestProduct',
            price: 10,
            categoryid: categoryid
        });
        productid = prodResult.id;
        const userResult = await new userModel_1.Users().create({
            id: 0,
            username: 'OrderAPITestUser',
            firstname: 'Test',
            lastname: 'User',
            password: '123456'
        });
        userid = userResult.id;
    });
    it('/Orders should create of Order  ', () => {
        const data = {
            "id": 0,
            "userid": userid,
            "orderdate": new Date(),
            "status": 'active'
        };
        test
            .post('/Orders')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
            "id": 1,
            "userid": userid,
            "orderdate": new Date(),
            "status": 'active'
        });
    });
    it('/Orders should return array of Orders ', () => {
        test
            .get('/Orders')
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
            "id": 1,
            "userid": userid,
            "orderdate": new Date(),
            "status": 'active'
        });
    });
    it('/Orders/1 should return of Order with id 1 ', () => {
        test
            .get('/Orders/1')
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
            "id": 1,
            "userid": userid,
            "orderdate": new Date(),
            "status": 'active'
        });
    });
    it('/Orders should edit Order status (active) to (complete) ', () => {
        const data = {
            "id": 1,
            "userid": userid,
            "orderdate": new Date(),
            "status": 'complete'
        };
        test
            .put('/Orders')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
            "id": 1,
            "userid": userid,
            "orderdate": new Date(),
            "status": 'complete'
        });
    });
    it('/Orders should delete Order with id 1 ', () => {
        const data = {
            "id": 1,
            "userid": userid,
            "orderdate": new Date(),
            "status": 'active'
        };
        test
            .delete('/Orders')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
            "id": 1,
            "userid": userid,
            "orderdate": new Date(),
            "status": 'complete'
        });
    });
});
