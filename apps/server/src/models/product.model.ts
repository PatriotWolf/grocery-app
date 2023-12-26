import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'products',
  modelName: 'Product',
  timestamps: true,
})
class Product extends Model<Product> {
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
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare brand: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    defaultValue: DataType.BIGINT,
  })
  declare barcode: boolean;
}

export default Product;
