import { Table, Model, DataType } from "sequelize-typescript";
import { v4 as uuid } from "uuid";

import connection from "../connections";
import { ProviderCategory } from '@typing/Provider';

@Table
class Provider extends Model {
  id: string;
  name: string;
  email: string;
  category: string;
}

Provider.init(
  {
    id: {
      type: DataType.STRING,
      autoIncrementIdentity: true,
      primaryKey: true,
    },

    name: {
      type: DataType.STRING,
      allowNull: false,
    },

    email: {
      type: DataType.STRING,
      allowNull: false,
    },

    category: {
      type: DataType.ENUM(ProviderCategory.BRINQUEDO, ProviderCategory.RACAO),
      allowNull: true
    },
  },
  {
    tableName: "providers",
    sequelize: connection,
  }
);

Provider.beforeSave((provider) => {
     provider.id = uuid();
});

Provider.sync()
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

export { Provider };
