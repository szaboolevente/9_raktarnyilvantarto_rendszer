import * as express from 'express';
import { OrderController } from './controllers/order.controller';
import { PartController } from './controllers/part.controller';
import { ProductController } from './controllers/product.controller';
import { UserController } from './controllers/user.controller';
import { validOrderRequestBody } from './validators/order.validator';
import { validPartRequestBody } from './validators/part.validator';
import { validProductRequestBody } from './validators/product.validator';
import { isLogedIn, validLoginUser, validSignUpUser } from './validators/user.validator';

export function getAllRoutes() {
    const router = express.Router();

    router.get("/api", (req, res) => {
        res.send("<h1>Root of the backend</h1>");
    });

    //PRODUCT
    const productController = new ProductController();
    router.get("/api/product", isLogedIn, productController.getAll);
    router.post("/api/product", isLogedIn, validProductRequestBody, productController.create);
    router.delete("/api/product/:id", isLogedIn, productController.delete);

    //PART
    const partController = new PartController();
    router.get("/api/part", isLogedIn, partController.getAll);
    router.post("/api/part", isLogedIn, validPartRequestBody, partController.create);
    router.delete("/api/part/:id", isLogedIn, partController.delete);
    router.put("/api/part/:id", isLogedIn, partController.increaseAmount);

    //ORDER
    const orderController = new OrderController();
    router.get("/api/order", isLogedIn, orderController.getAll);
    router.post("/api/order", isLogedIn, validOrderRequestBody, orderController.makeOrder);

    //USER
    const userController = new UserController();
    router.post("/api/user/login", validLoginUser, userController.login);
    router.post("/api/user/signup", validSignUpUser, userController.signup);

    return router;
}