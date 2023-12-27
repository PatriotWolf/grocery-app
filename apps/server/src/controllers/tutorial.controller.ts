import { Op } from 'sequelize';
import Tutorial from '../models/tutorial.model';
import { NextFunction, Request, Response } from 'express';

//Create
export const createTutorial = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, description } = req.body;
  try {
    const result = await Tutorial.create({
      title,
      description,
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
export const getAllTutorials = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const query = req.query.query;
  const condition = query
    ? {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } },
        ],
      }
    : null;
  try {
    const result = await Tutorial.findAll({
      attributes: ['id', 'title', 'description'],
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
export const editTutorials = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id, title, description } = req.body;
  try {
    const result = await Tutorial.update(
      {
        title,
        description,
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
export const deleteTutorials = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.body;
  try {
    const result = await Tutorial.destroy({
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
