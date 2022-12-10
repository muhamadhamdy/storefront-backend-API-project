import supertest from 'supertest'
import { Categories } from '../../../api/models/categoryModel';
import app from '../../../server';


const test = supertest(app);



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
