import { DataTypes, ModelDefined } from 'sequelize';
import SequelizeConnector from '../configs/db.config';

interface TutorialAttributes {
  id: number;
  title: string;
  description: string;
  published: boolean;
}
interface TutorialCreationAttributes extends Omit<TutorialAttributes, 'id'> {}

const Tutorial: ModelDefined<TutorialAttributes, TutorialCreationAttributes> =
  SequelizeConnector.define(
    'tutorial',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        unique: true,
      },
      description: {
        type: DataTypes.STRING,
      },
      published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      // For the sake of clarity we specify our indexes
      indexes: [{ unique: true, fields: ['id'] }],
    },
  );

export default Tutorial;
