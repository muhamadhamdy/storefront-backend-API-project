"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categoryModel_1 = require("../../../api/models/categoryModel");
const modelClass = new categoryModel_1.Categories();
let catId = 0;
describe('- Categories Model Testing', () => {
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
    it('Can Create Category (TestCategory)', async () => {
        const result = await modelClass.create({
            id: 0,
            categoryname: 'TestCategory',
        });
        const obj = { categoryname: result.categoryname };
        catId = result.id;
        expect(obj).toEqual({
            categoryname: 'TestCategory'
        });
    });
    it('Show Category with id 1', async () => {
        const result = await modelClass.show(catId);
        const obj = { id: result.id, categoryname: result.categoryname };
        expect(obj).toEqual({
            id: catId,
            categoryname: 'TestCategory'
        });
    });
    it('Can Edit Category (TestCategory) to (TestCategory1)', async () => {
        const result = await modelClass.edit({
            id: catId,
            categoryname: 'TestCategory1',
        });
        const obj = { categoryname: result.categoryname };
        expect(obj).toEqual({
            categoryname: 'TestCategory1'
        });
    });
    it('Can Delete Category (TestCategory1)', async () => {
        const result = await modelClass.delete(catId);
        const obj = { categoryname: result.categoryname };
        expect(obj).toEqual({
            categoryname: 'TestCategory1'
        });
    });
});
