"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = require("../../../api/models/productModel");
const categoryModel_1 = require("../../../api/models/categoryModel");
const modelClass = new productModel_1.Products();
let categoryid = 0;
let productid = 0;
describe('- Products Model Testing', () => {
    beforeAll(async () => {
        const result = await new categoryModel_1.Categories().create({
            id: 0,
            categoryname: 'TestCategory',
        });
        categoryid = result.id;
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
    it('Can retrieve Categories', () => {
        modelClass.index().then((u) => {
            expect([]);
        });
    });
    it('Can Create product (TestProduct)', async () => {
        const result = await modelClass.create({
            id: 0,
            productname: 'TestProduct',
            price: 10,
            categoryid: categoryid
        });
        productid = result.id;
        expect(result).toEqual({
            id: productid,
            productname: 'TestProduct',
            price: 10,
            categoryid: categoryid
        });
    });
    it('Show Product with id 1', async () => {
        const result = await modelClass.show(productid);
        expect(result).toEqual({
            id: productid,
            productname: 'TestProduct',
            price: 10,
            categoryid: categoryid
        });
    });
    it('Edit Product with name (TestProduct) to (TestProduct1)', async () => {
        const result = await modelClass.edit({
            id: productid,
            productname: 'TestProduct1',
            price: 10,
            categoryid: categoryid
        });
        expect(result).toEqual({
            id: productid,
            productname: 'TestProduct1',
            price: 10,
            categoryid: categoryid
        });
    });
    it('delete User with name (TestProduct1)', async () => {
        const result = await modelClass.delete(productid);
        expect(result).toEqual({
            id: productid,
            productname: 'TestProduct1',
            price: 10,
            categoryid: categoryid
        });
    });
});
