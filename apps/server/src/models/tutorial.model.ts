import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'tutorials',
  modelName: 'Tutorial',
  timestamps: true,
})
class Tutorial extends Model<Tutorial> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.STRING,
    defaultValue: '',
  })
  declare description: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare published: boolean;
}

export default Tutorial;
