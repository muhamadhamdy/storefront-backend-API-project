"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = require("../../../api/models/productModel");
const categoryModel_1 = require("../../../api/models/categoryModel");
const orderModel_1 = require("../../../api/models/orderModel");
const userModel_1 = require("../../../api/models/userModel");
const modelClass = new orderModel_1.Orders();
let userid = 0;
let categoryid = 0;
let productid = 0;
let orderid = 1;
describe('- Orders Model Testing', () => {
    beforeAll(async () => {
        const catResult = await new categoryModel_1.Categories().create({
            id: 0,
            categoryname: 'OrderTestCategory',
        });
        categoryid = catResult.id;
        const prodResult = await new productModel_1.Products().create({
            id: 0,
            productname: 'OrderTestProduct',
            price: 10,
            categoryid: categoryid
        });
        productid = prodResult.id;
        const userResult = await new userModel_1.Users().create({
            id: 0,
            username: 'OrderTestUser',
            firstname: 'Test',
            lastname: 'User',
            password: '123456'
        });
        userid = userResult.id;
    });
    it('Index method defined', () => {
        expect(modelClass.index).toBeDefined();
    });
    it('Show method defined', () => {
        expect(modelClass.show).toBeDefined();
    });
    it('Create method defined', () => {
        expect(modelClass.create).toBeDefined();
    });
    it('Delete method defined', () => {
        expect(modelClass.delete).toBeDefined();
    });
    it('Update method defined', () => {
        expect(modelClass.edit).toBeDefined();
    });
    it('Can retrieve orders', () => {
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
        const obj = { id: result?.id, userid: result?.userid, status: result?.status };
        orderid = result?.id ? result?.id : 1;
        expect(obj).toEqual({
            id: orderid,
            userid: userid,
            status: 'active'
        });
    });
    it('Show order with id 1', async () => {
        const result = await modelClass.show(orderid, userid);
        const obj = { id: result?.id, userid: result?.userid, status: result?.status };
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
        const obj = { id: result?.id, userid: result?.userid, status: result?.status };
        expect(obj).toEqual({
            id: orderid,
            userid: userid,
            status: 'complete'
        });
    });
    it(`delete order with id (${orderid})`, async () => {
        const result = await modelClass.delete(orderid, userid);
        const obj = { id: result?.id, userid: result?.userid, status: result?.status };
        expect(obj).toEqual({
            id: orderid,
            userid: userid,
            status: 'complete'
        });
    });
});
