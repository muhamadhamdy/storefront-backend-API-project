"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../../server"));
const test = (0, supertest_1.default)(server_1.default);
describe('* Users API endpoints testing.', () => {
    it('/Users should create of product  ', () => {
        const data = {
            "id": 0,
            "username": "apitestuser",
            "firstname": "test",
            "lastname": "user",
            "password": "123456"
        };
        test
            .post('/Users')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
            "id": 1,
            "username": "apitestuser",
            "firstname": "test",
            "lastname": "user",
            "password": "123456"
        });
    });
    it('/Users should return array of Users ', () => {
        test
            .get('/Users')
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
            "id": 1,
            "username": "apitestuser",
            "firstname": "test",
            "lastname": "user",
            "password": "123456"
        });
    });
    it('/Users/1 should return of User with id 1 ', () => {
        test
            .get('/Users/1')
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
            "id": 1,
            "username": "apitestuser",
            "firstname": "test",
            "lastname": "user",
            "password": "123456"
        });
    });
    it('/Users should edit User with id 1 ', () => {
        const data = {
            "id": 1,
            "username": "apitestuser22",
            "firstname": "test",
            "lastname": "user",
            "password": "123456"
        };
        test
            .put('/Users')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
            "id": 1,
            "username": "apitestuser22",
            "firstname": "test",
            "lastname": "user",
            "password": "123456"
        });
    });
    it('/Users should delete User with id 1 ', () => {
        const data = {
            "id": 1,
            "username": "apitestuser22",
            "firstname": "test",
            "lastname": "user",
            "password": "123456"
        };
        test
            .delete('/Users')
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
            "id": 1,
            "username": "apitestuser22",
            "firstname": "test",
            "lastname": "user",
            "password": "123456"
        });
    });
});
