import User from '../models/user.model.js';
import HttpError from '../models/http.error.model.js';

const fetchAll = (req, res, next) => {
  const users = User.fetchAll();
  console.log(users);
  res.json(users);
};
const create = (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = new User(name, email, password);
  newUser.save();
  res.redirect('/api/users');
};
const read = (req, res, next) => {
  const { id } = req.params;
  const user = User.fetchById(id);
  if (!user) {
    return next(new HttpError('Invalid UserId', 404));
  }
  return res.json({ user });
};
const update = (req, res, next) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const user = User.fetchById(id);
  if (!user) {
    return next(new HttpError('Invalid UserId', 404));
  }
  User.update(id, { name, email, password });
  return res.redirect('/api/users');
};
const deleteById = (req, res, next) => {
  const { id } = req.params;
  const user = User.fetchById(id);
  if (!user) {
    return next(new HttpError('Invalid UserId', 404));
  }
  User.deleteById(id);
  return res.redirect('/api/users');
};

export {
  fetchAll, create, read, update, deleteById,
};
