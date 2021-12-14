const fetchAll = (req, res, next) => {
  res.json({ message: 'fetch all' });
};
const create = (req, res, next) => {
  res.json({});
  next();
};
const read = (req, res, next) => {
  res.json({});
};
const update = (req, res, next) => {
  res.json({});
};
const deleteById = (req, res, next) => {
  res.json({});
};

export {
  fetchAll,
  create,
  read,
  update,
  deleteById,
};
