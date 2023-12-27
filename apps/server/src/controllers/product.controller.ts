import { Op } from 'sequelize';
import Product from '../models/product.model';
import { NextFunction, Request, Response } from 'express';

//Create
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, brand } = req.body;
  try {
    const result = await Product.create({
      name,
      brand,
    });
    res.status(201).json({
      message: 'Record created successfully!',
      data: {
        ...result.get({ plain: true }),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Unable to fetch records!',
      error: error.message,
    });
    next(error);
  }
};

//Read
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const query = req.query.query;
  const condition = query
    ? {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { brand: { [Op.iLike]: `%${query}%` } },
        ],
      }
    : null;
  try {
    const result = await Product.findAll({
      attributes: ['id', 'name', 'brand'],
      where: condition,
    });
    res.status(201).json({
      message: 'Record created successfully!',
      data: {
        ...result,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Unable to fetch records!',
      error: error.message,
    });
    next(error);
  }
};

//Update
export const editProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id, name, brand, barcode } = req.body;
  try {
    const result = await Product.update(
      {
        name,
        brand,
        barcode,
      },
      {
        where: { id },
        returning: true,
      },
    );
    res.status(200).json({
      message: 'Record created successfully!',
      data: { ...result[1][0] },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Unable to fetch records!',
      error: error.message,
    });
    next(error);
  }
};

//Delete
export const deleteProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.body;
  try {
    const result = await Product.destroy({
      where: {
        id: id,
      },
    });
    result
      ? res.status(202).json({ message: 'Record deleted successfully!' })
      : res.status(404).send({
          message: 'Unable to fetch records!',
          error: 'No record found!',
        });
  } catch (error) {
    res.status(500).json({
      message: 'Unable to delete the record!',
      error: error.message,
    });
    next(error);
  }
};
