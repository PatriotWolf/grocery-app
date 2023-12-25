import { Op } from 'sequelize';
import Tutorial from '../models/tutorial.model';

//Create
export const createTutorial = (req, res) => {
  const { title, description } = req.body;
  Tutorial.create({
    title,
    description,
  })
    .then(result => {
      return res.json({
        message: 'Record created successfully!',
        data: {
          ...result,
        },
      });
    })
    .catch(errors => {
      return res.json({
        message: 'Unable to create a record!',
        error: errors.message,
      });
    });
  Tutorial;
};

export const getAllTutorials = (req, res) => {
  const query = req.query.query;
  const condition = query
    ? {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } },
        ],
      }
    : null;
  Tutorial.findAll({
    attributes: ['title', 'description'],
    where: condition,
  })
    .then(result => {
      return res.json(result);
    })
    .catch(errors => {
      return res.json({
        message: 'Unable to fetch records!',
        error: errors.message,
      });
    });
};

export const editTutorials = (req, res) => {
  const id = req.params.id;
  Tutorial.update(
    {
      title: req.body.title,
      description: req.body.description,
    },
    {
      where: { id: id },
    },
  )
    .then(result => {
      return res.json(result);
    })
    .catch(errors => {
      return res.json({
        message: 'Unable to update the record!',
        error: errors.message,
      });
    });
};

export const deleteTutorials = (req, res) => {
  const id = req.params.id;
  Tutorial.destroy({
    where: {
      id: id,
    },
  })
    .then(result => {
      return res.json(result);
    })
    .catch(errors => {
      return res.json({
        message: 'Unable to delete the record!',
        error: errors.message,
      });
    });
};
