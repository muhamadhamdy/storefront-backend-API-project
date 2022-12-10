import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import usersRoutes from './api/handlers/usersHandler';
import signInRoutes from './api/handlers/signHandler';
import productsRoutes from './api/handlers/productsHandler';
import categoriesRoutes from './api/handlers/categoriesHandler';
import ordersRoutes from './api/handlers/ordersHandler';
import orderProductsRoutes from './api/handlers/orderProductHandler';

const app: express.Application = express();
const address: string = '127.0.0.1:3000';

const corsOptions = {optionsSuccessStatus: 200};
app.use(cors(corsOptions));
app.use(bodyParser.json());

signInRoutes(app);
usersRoutes(app);
productsRoutes(app);
categoriesRoutes(app);
ordersRoutes(app);
orderProductsRoutes(app);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});


export default app;