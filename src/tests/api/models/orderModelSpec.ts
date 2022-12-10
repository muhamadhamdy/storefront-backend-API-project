import { Products } from '../../../api/models/productModel';
import { Categories } from '../../../api/models/categoryModel';
import { Orders } from '../../../api/models/orderModel';
import { Users } from '../../../api/models/userModel';

const modelClass = new Orders();
let userid: number = 0;
let categoryid: number = 0;
let productid: number = 0;
let orderid: number = 1;

describe('- Orders Model Testing', (): void => {

    beforeAll(async () => {
        const catResult = await new Categories().create({
            id: 0,
            categoryname: 'OrderTestCategory',
        });
        categoryid = catResult.id;
        const prodResult = await new Products().create({
            id: 0,
            productname: 'OrderTestProduct',
            price: 10,
            categoryid: categoryid
        });
        productid = prodResult.id;
        const userResult = await new Users().create({
            id: 0,
            username: 'OrderTestUser',
            firstname: 'Test',
            lastname: 'User',
            password: '123456'
        });
        userid = userResult.id;
    })

    it('Index method defined', (): void => {
        expect(modelClass.index).toBeDefined();
    });

    it('Show method defined', (): void => {
        expect(modelClass.show).toBeDefined();
    });

    it('Create method defined', (): void => {
        expect(modelClass.create).toBeDefined();
    });

    it('Delete method defined', (): void => {
        expect(modelClass.delete).toBeDefined();
    });

    it('Update method defined', (): void => {
        expect(modelClass.edit).toBeDefined();
    });

    it('Can retrieve orders', (): void => {
        modelClass.index(1).then((u) => {
            expect([]);
        });
    });

    it('Can Create Order', async () => {

        const result = await modelClass.create({
            id: 0,
            userid: userid,
            orderdate: new Date(),
            status: 'active',
            products: [{ id: 0, productid: productid, quantity: 1, productname: '', unitprice: 0 }]
        });
        const obj = { id: result?.id, userid: result?.userid, status: result?.status }
        orderid = result?.id ? result?.id : 1;
        expect(obj).toEqual({
            id: orderid,
            userid: userid,
            status: 'active'
        });
    });

    it('Show order with id 1', async () => {
        const result = await modelClass.show(orderid, userid);
        const obj = { id: result?.id, userid: result?.userid, status: result?.status }
        expect(obj).toEqual({
            id: orderid,
            userid: userid,
            status: 'active'
        });
    });


    it('Edit order with status (active) to (complete)', async () => {
        const result = await modelClass.edit({
            id: orderid,
            userid: userid,
            orderdate: new Date(),
            status: 'complete'
        }, userid);
        const obj = { id: result?.id, userid: result?.userid, status: result?.status }
        expect(obj).toEqual({
            id: orderid,
            userid: userid,
            status: 'complete'
        });
    });

    it(`delete order with id (${orderid})`, async () => {
        const result = await modelClass.delete(orderid, userid);
        const obj = { id: result?.id, userid: result?.userid, status: result?.status }
        expect(obj).toEqual({
            id: orderid,
            userid: userid,
            status: 'complete'
        });
    });

});
