import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
const ProductsModel = sequelize.define(
  "Products",
  {
    ProductName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rate: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    stock : {
      type: DataTypes.INTEGER,
      allowNull : false
    }
  },
  
);

export default ProductsModel;
