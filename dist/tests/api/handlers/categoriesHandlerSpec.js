"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../../server"));
const test = (0, supertest_1.default)(server_1.default);
describe('* Categories API endpoints testing.', () => {
    it('/Categories should create of product  ', () => {
        const data = {
            "id": 0,
            "categoryname": "API test Category"
        };
        test
            .post('/Categories')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
            "id": 1,
            "categoryname": "API test Category"
        });
    });
    it('/Categories should return array of categories ', () => {
        test
            .get('/Categories')
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
            "id": 1,
            "categoryname": "API test Category"
        });
    });
    it('/Categories/1 should return of Category with id 1 ', () => {
        test
            .get('/Categories/1')
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
            "id": 1,
            "categoryname": "API test Category"
        });
    });
    it('/Categories should edit Category with id 1 ', () => {
        const data = {
            "id": 1,
            "categoryname": "API test Category"
        };
        test
            .put('/Categories')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
            "id": 1,
            "categoryname": "API test Category"
        });
    });
    it('/Categories should delete Category with id 1 ', () => {
        const data = {
            "id": 1,
            "categoryname": "API test Category"
        };
        test
            .delete('/Categories')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
            "id": 1,
            "categoryname": "API test Category"
        });
    });
});
