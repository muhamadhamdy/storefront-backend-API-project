import { user, Users } from '../../../api/models/userModel';

let userid:number=0;

const modelClass = new Users();
describe('- Users Model Testing', (): void => {
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

    it('Can retrieve Users', (): void => {
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
        const obj={username:result.username,firstname: result.firstname,lastname: result.lastname}
        userid=result.id;
        expect(obj).toEqual({
            username: 'testuser',
            firstname: 'Test',
            lastname: 'User'
        });
    });

    it('Show User with id 1', async () => {
        const result = await modelClass.show(userid);
        const obj={id:result.id,username:result.username,firstname: result.firstname,lastname: result.lastname}
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
        const obj={id:result.id,username:result.username,firstname: result.firstname,lastname: result.lastname}
        expect(obj).toEqual({
            id: userid,
            username: 'testuser',
            firstname: 'Test1',
            lastname: 'User'
        });
    });

    it('delete User with id 1', async () => {
        const result = await modelClass.delete(userid);
        const obj={id:result.id,username:result.username,firstname: result.firstname,lastname: result.lastname}
        expect(obj).toEqual({
            id: userid,
            username: 'testuser',
            firstname: 'Test1',
            lastname: 'User'
        });
    });


    setTimeout(()=>{},1000);
});
