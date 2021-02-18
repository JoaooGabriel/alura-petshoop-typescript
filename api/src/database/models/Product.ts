import { Table, Model, DataType } from "sequelize-typescript";
import { v4 as uuid } from "uuid";

import connection from "../connections";

@Table
class Product extends Model {
  id: string;
  name: string;
  value: string;
  inventory: number;
  providerId: string;
}

Product.init(
  {
    id: {
      type: DataType.STRING,
      autoIncrementIdentity: true,
      primaryKey: true,
    },

    name: {
      type: DataType.STRING(100),
      allowNull: false,
    },

    value: {
      type: DataType.DOUBLE,
      allowNull: false,
    },

    inventory: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    providerId: {
      type: DataType.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "products",
    sequelize: connection,
  }
);

Product.beforeSave((product) => {
  product.id = uuid();
});

Product.sync()
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

export { Product };
