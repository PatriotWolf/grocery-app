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

export const getAllTutorials = (_req, res) => {
  Tutorial.findAll({
    attributes: ['title', 'description'],
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
