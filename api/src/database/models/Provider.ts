import { Table, Model, DataType } from "sequelize-typescript";
import { v4 as uuid } from "uuid";

import connection from "../connections";
import { ProviderCategory } from '@typing/Provider';
import { Product } from '@models/Product';

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
      validate: {
        notEmpty: {
          msg: 'Campo name não pode ser vazio.'
        }
      }
    },

    email: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Campo email precisar ser do tipo email.'
        }
      }
    },

    category: {
      type: DataType.ENUM(ProviderCategory.BRINQUEDO, ProviderCategory.RACAO),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Campo category não pode ser vazio.'
        }
      }
    },
  },
  {
    tableName: "providers",
    sequelize: connection,
  }
);

Provider.hasMany(Product, {
  sourceKey: "id",
  foreignKey: "providerId",
  constraints: false,
});

Provider.beforeSave((provider) => {
     provider.id = uuid();
});

Provider.sync()
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

export { Provider };
