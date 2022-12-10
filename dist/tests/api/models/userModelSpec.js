"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../../../api/models/userModel");
let userid = 0;
const modelClass = new userModel_1.Users();
describe('- Users Model Testing', () => {
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
    it('Can retrieve Users', () => {
        modelClass.index().then((u) => {
            expect([]);
        });
    });
    it('Can Create user (TestUser)', async () => {
        const result = await modelClass.create({
            id: 0,
            username: 'TestUser',
            firstname: 'Test',
            lastname: 'User',
            password: '123456'
        });
        const obj = { username: result.username, firstname: result.firstname, lastname: result.lastname };
        userid = result.id;
        expect(obj).toEqual({
            username: 'testuser',
            firstname: 'Test',
            lastname: 'User'
        });
    });
    it('Show User with id 1', async () => {
        const result = await modelClass.show(userid);
        const obj = { id: result.id, username: result.username, firstname: result.firstname, lastname: result.lastname };
        expect(obj).toEqual({
            id: userid,
            username: 'testuser',
            firstname: 'Test',
            lastname: 'User'
        });
    });
    it('Edit User with id 1', async () => {
        const result = await modelClass.edit({
            id: userid,
            username: 'testuser',
            firstname: 'Test1',
            lastname: 'User',
            password: '123456'
        });
        const obj = { id: result.id, username: result.username, firstname: result.firstname, lastname: result.lastname };
        expect(obj).toEqual({
            id: userid,
            username: 'testuser',
            firstname: 'Test1',
            lastname: 'User'
        });
    });
    it('delete User with id 1', async () => {
        const result = await modelClass.delete(userid);
        const obj = { id: result.id, username: result.username, firstname: result.firstname, lastname: result.lastname };
        expect(obj).toEqual({
            id: userid,
            username: 'testuser',
            firstname: 'Test1',
            lastname: 'User'
        });
    });
    setTimeout(() => { }, 1000);
});
