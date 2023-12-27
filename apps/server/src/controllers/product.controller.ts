import { Op } from 'sequelize';
import Product from '../models/product.model';
import { NextFunction, Request, Response } from 'express';

//Create
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, brand, barcode } = req.body;
  try {
    const result = await Product.create({
      name,
      brand,
      barcode,
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
  const page = parseInt(req.query.page as string) || 1;
  const sort =
    req.query.sort === 'name' || req.query.sort === 'brand'
      ? req.query.sort
      : null;
  const order =
    req.query.order === 'ASC' || req.query.order === 'DESC'
      ? req.query.order
      : null;
  const condition = query
    ? {
        [Op.or]: [
          { name: { [Op.iLike]: `%${query}%` } },
          { brand: { [Op.iLike]: `%${query}%` } },
        ],
      }
    : null;
  try {
    const offset = (page - 1) * 20; // TODO: create constant for page limit
    const limit = 20;
    const { count, rows } = await Product.findAndCountAll({
      attributes: ['id', 'name', 'brand', 'barcode', 'image'],
      order: sort ? [[sort, order || 'ASC']] : undefined,
      where: condition,
      limit,
      offset,
    });
    const lastPage = Math.ceil(count / limit);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    res.status(201).json({
      message: 'Record fetch successfully!',
      data: {
        products: rows,
        count,
        currentPage: page,
        nextPage: nextPage,
        prevPage: prevPage,
        lastPage: lastPage,
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
//Read One
export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  try {
    const result = await Product.findByPk(id as string);
    if (!result) {
      throw new Error('Record not found.');
    }
    res.status(201).json({
      message: 'Record fetch successfully!',
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
