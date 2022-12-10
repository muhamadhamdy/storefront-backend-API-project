import { response } from 'express';
import supertest from 'supertest'
import { Categories } from '../../../api/models/categoryModel';
import app from '../../../server';


const test = supertest(app);

// create category for testing
let productid: number = 1;
let categoryid: number = 0;

describe('* Product API endpoints testing.', () => {

    beforeAll(async () => {
        const result = await new Categories().create({
            id: 0,
            categoryname: 'APITestCategory',
        });
        categoryid = result.id;
    })
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
