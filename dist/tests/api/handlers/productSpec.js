"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const categoryModel_1 = require("../../../api/models/categoryModel");
const server_1 = __importDefault(require("../../../server"));
const test = (0, supertest_1.default)(server_1.default);
// create category for testing
let productid = 1;
let categoryid = 0;
const createCategory = async () => {
    const result = await new categoryModel_1.Categories().create({
        id: 0,
        categoryname: 'TestCategory',
    });
    categoryid = result.id;
};
createCategory();
describe('Product API endpoints testing.', () => {
    it('/products/ should create of product  ', () => {
        const data = {
            "id": 0,
            "productname": "API test Product",
            "price": 1,
            "categoryid": categoryid
        };
        test
            .post('/products')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
            "id": 1,
            "productname": "API test Product",
            "price": 1,
            "categoryid": categoryid
        });
    });
    it('/products should return array of products ', () => {
        test
            .get('/products')
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
            "id": 1,
            "productname": "API test Product",
            "price": 1,
            "categoryid": categoryid
        });
    });
    it('/products/1 should return of product with id 1 ', () => {
        test
            .get('/products/1')
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
            "id": 1,
            "productname": "API test Product",
            "price": 1,
            "categoryid": categoryid
        });
    });
    it('/products should edit product with id 1 ', () => {
        const data = {
            "id": 1,
            "productname": "API test Product 2",
            "price": 1,
            "categoryid": categoryid
        };
        test
            .put('/products')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
            "id": 1,
            "productname": "API test Product 2",
            "price": 1,
            "categoryid": categoryid
        });
    });
    it('/products should delete product with id 1 ', () => {
        const data = {
            "id": 1,
            "productname": "API test Product 2",
            "price": 1,
            "categoryid": categoryid
        };
        test
            .delete('/products')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
            "id": 1,
            "productname": "API test Product 2",
            "price": 1,
            "categoryid": categoryid
        });
    });
});
