import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({
  tableName: 'products',
  modelName: 'Product',
  timestamps: true,
})
class Product extends Model<Product> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
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
    unique: true,
    //this is temporary solution
    defaultValue: Math.floor(Math.random() * 9000000000) + 100000000000,
  })
  declare barcode: number;

  @Column({
    type: DataType.STRING,
  })
  declare image: string;
}

export default Product;
