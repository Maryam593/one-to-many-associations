import { Router } from "express";
import ProductController from "../../controllers/products/index.js";


const productsRouter = Router();
productsRouter.get("/Allproducts",ProductController.getAll);
productsRouter.get("/FindProducts/:id",ProductController.getSingle);
productsRouter.post("/createProducts",ProductController.create);
productsRouter.put("/UpdateProducts/:id",ProductController.update);
productsRouter.delete("/DeleteProducts/:id",ProductController.Delete);

export default productsRouter;