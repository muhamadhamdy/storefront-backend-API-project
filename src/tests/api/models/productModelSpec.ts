import { product, Products } from '../../../api/models/productModel';
import { Categories } from '../../../api/models/categoryModel';

const modelClass = new Products();

let categoryid: number = 0;
let productid: number = 0;

describe('- Products Model Testing', (): void => {
    beforeAll(async () => {
        const result = await new Categories().create({
            id: 0,
            categoryname: 'TestCategory',
        });
        categoryid = result.id;
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

    it('Can retrieve Categories', (): void => {
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
