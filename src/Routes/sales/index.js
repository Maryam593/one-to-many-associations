import { Router } from "express";
import SalesController from "../../controllers/sales/index.js";


const salesRouter = Router();
salesRouter.get("/Allsales",SalesController.getAll);
salesRouter.get("/FindSales/:id",SalesController.getSingle);
salesRouter.post("/createSales",SalesController.create);
salesRouter.put("/UpdateSales/:id",SalesController.update);
salesRouter.delete("/DeleteSales/:id",SalesController.Delete);

export default salesRouter;