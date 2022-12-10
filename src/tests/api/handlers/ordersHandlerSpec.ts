import supertest from 'supertest'
import { Categories } from '../../../api/models/categoryModel';
import { Products } from '../../../api/models/productModel';
import { Users } from '../../../api/models/userModel';
import app from '../../../server';


const test = supertest(app);

let userid: number = 0;
let categoryid: number = 0;
let productid: number = 0;
let orderid: number = 1;

describe('* Orders API endpoints testing.', () => {

    beforeAll(async () => {
        // Create required user,product and category for testing
        const catResult = await new Categories().create({
            id: 0,
            categoryname: 'OrderAPITestCategory',
        });
        categoryid = catResult.id;
        const prodResult = await new Products().create({
            id: 0,
            productname: 'OrderAPITestProduct',
            price: 10,
            categoryid: categoryid
        });
        productid = prodResult.id;
        const userResult = await new Users().create({
            id: 0,
            username: 'OrderAPITestUser',
            firstname: 'Test',
            lastname: 'User',
            password: '123456'
        });
        userid = userResult.id;
    })

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
