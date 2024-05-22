import ProductSalesModel from "../models/productSales/index.js";
import ProductsModel from "../models/produts/index.js";
import SalesModel from "../models/sales/index.js";



const syncDB = async()=> {
    await SalesModel.sync({alter : true, force : false})
    await ProductsModel.sync({alter : true, force : false})
    await ProductSalesModel.sync({alter: true, force: false})
}

export default syncDB;