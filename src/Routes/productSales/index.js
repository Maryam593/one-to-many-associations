import { Router } from "express";
import ProductSalesController from "../../controllers/productSales/index.js";

const ProductSalesRouter = Router();
ProductSalesRouter.get("/AllProductSales",ProductSalesController.getAll);
ProductSalesRouter.get("/FindProductSales/:id",ProductSalesController.getSingle);
ProductSalesRouter.post("/createProductSales",ProductSalesController.create);
ProductSalesRouter.put("/UpdateProductSales/:id",ProductSalesController.update);
ProductSalesRouter.delete("/DeleteProductSales/:id",ProductSalesController.Delete);

export default ProductSalesRouter;