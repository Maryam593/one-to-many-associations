import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import SalesModel from "../sales/index.js";
import ProductsModel from "../produts/index.js";
const ProductSalesModel = sequelize.define(
  "ProductSales",
  {
   ProductName : {
      type: DataTypes.STRING,
      allowNull : true
   },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    Quantity : {
        type : DataTypes.INTEGER,
        allowNull : true
    }
  },
  
);

export default ProductSalesModel;

//Associations

SalesModel.hasMany(ProductSalesModel);
ProductSalesModel.belongsTo(SalesModel);

ProductsModel.hasMany(ProductSalesModel);
ProductSalesModel.belongsTo(ProductsModel);

