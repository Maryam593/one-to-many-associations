import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
const SalesModel = sequelize.define(
  "Sales",
  {
    totalAmount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

export default SalesModel;
